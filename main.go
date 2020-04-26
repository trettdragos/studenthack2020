package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"regexp"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"github.com/jzelinskie/geddit"
)

var jokes chan joke
var commands chan command
var counter safeInt

const (
	boredom     = 20
	maxStrange  = 2
	maxCommands = 500
	maxJokes    = 500
)

type safeInt struct {
	value int
	mux   sync.Mutex
}

type joke struct {
	Title       string `json:"Title"`
	Description string `json:"Description"`
}

type command struct {
	Type      string `json:"Type"`
	Direction string `json:"Direction"`
}

func updateJokes(surplus int, sorting geddit.PopularitySort) {
	session := geddit.NewSession("joke_bot")
	reg, err := regexp.Compile("[^a-zA-Z0-9 '.,]+")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("got session")
	subOpts := geddit.ListingOptions{
		Limit: surplus + len(jokes) + 3,
	}
	submissions, _ := session.SubredditSubmissions("jokes", sorting, subOpts)
	fmt.Println("got submissions")

	for _, sub := range submissions[1:] {
		latest := joke{Title: reg.ReplaceAllString(sub.Title, ""), Description: reg.ReplaceAllString(sub.Selftext, "")}
		jokes <- latest
		// fmt.Println(latest.Title)
	}

	fmt.Println("put submissions")
}

func getAStrangeThought() geddit.Submission {
	session := geddit.NewSession("joke_bot")
	reg, err := regexp.Compile("[^a-zA-Z0-9 '.,]+")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("got strange session")
	subOpts := geddit.ListingOptions{
		Limit: 100,
	}
	submissions, _ := session.SubredditSubmissions("showerthoughts", geddit.HotSubmissions, subOpts)
	submission := submissions[rand.Intn(100)]
	submission.Title = reg.ReplaceAllString(submission.Title, "")
	submission.Selftext = reg.ReplaceAllString(submission.Selftext, "")
	fmt.Println("got submission session")
	return *submission

}

func getJoke(w http.ResponseWriter, r *http.Request) {
	if len(jokes) == 0 {
		updateJokes(10, geddit.NewSubmissions)
	}
	data := <-jokes
	fmt.Println(data.Title)
	json.NewEncoder(w).Encode(data)

}

func topUpJokes(w http.ResponseWriter, r *http.Request) {
	updateJokes(10, geddit.NewSubmissions)
}

func createCommand(w http.ResponseWriter, r *http.Request) {

	var newCommand command
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error making command invalid data: ", w)
	}
	json.Unmarshal(body, &newCommand)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newCommand)
	commands <- newCommand
	fmt.Println("app gave a new command")
	resetBoredomTimer()

}

func getCommand(w http.ResponseWriter, r *http.Request) {
	var data command
	if len(commands) > 0 {
		data = <-commands
		fmt.Println("command sent to robot")
	} else {

		data.Type = "null"
		data.Direction = "null"
	}
	json.NewEncoder(w).Encode(data)

}

func BoredomTimer() {
	counter.mux.Lock()
	counter.value--
	fmt.Println("bored count", counter.value)
	if counter.value <= 0 {
		fmt.Println("I got bored so i thought of something")
		counter.value = boredom
		if len(commands) < maxStrange {
			thought := getAStrangeThought()
			var borredCommand command
			borredCommand.Type = "strange"
			borredCommand.Direction = thought.Title
			commands <- borredCommand
		} else {
			fmt.Println("But I didn't put it in")
		}
	}
	counter.mux.Unlock()
	time.Sleep(1 * time.Second)
	BoredomTimer()
}

func resetBoredomTimer() {
	counter.mux.Lock()
	counter.value = boredom
	counter.mux.Unlock()
}

func main() {
	counter.mux.Lock()
	counter.value = boredom
	counter.mux.Unlock()
	go BoredomTimer()
	jokes = make(chan joke, maxJokes)
	commands = make(chan command, maxCommands)
	updateJokes(150, geddit.HotSubmissions)
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/joke", getJoke)
	router.HandleFunc("/topup", topUpJokes)
	router.HandleFunc("/app/putcommand", createCommand)
	router.HandleFunc("/robot/getcommand", getCommand)

	log.Fatal(http.ListenAndServe("0.0.0.0:5002", router))

}
