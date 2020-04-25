package main

import (
	// "fmt"
	// "os"
	// "regexp"
	// htgotts "github.com/hegedustibor/htgo-tts"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jzelinskie/geddit"
)

var jokes chan joke
var commands chan command

type joke struct {
	Title       string `json:"Title"`
	Description string `json:"Description"`
}

type command struct {
	Type      string `json:"Title"`
	Direction string `json:"Description"`
}

// func toSpeech(s geddit.Submission) {
// 	reg, _ := regexp.Compile("[^a-zA-Z0-9'.]+")
// 	speech := htgotts.Speech{Folder: "lines", Language: "en"}
// 	line := reg.ReplaceAllString(s.Title+ s.Selftext," ")
// 	fmt.Println(" got post ->", line)
// 	speech.Speak(line[:200])
// 	// filename := "lines/joke.mp3"
// 	// src := "lines/" + s.Title + s.Selftext
// 	// os.Rename(src, filename)
// }

func updateJokes(surplus int) {
	session := geddit.NewSession("joke_bot")
	fmt.Println("got session")
	subOpts := geddit.ListingOptions{
		Limit: surplus + len(jokes),
	}
	submissions, _ := session.SubredditSubmissions("jokes", geddit.HotSubmissions, subOpts)
	fmt.Println("got submissions")
	for i := len(jokes); i < surplus+len(jokes); i++ {
		latest := joke{Title: submissions[i].Title, Description: submissions[i].Selftext}
		jokes <- latest
		fmt.Println(latest.Title)
	}
	fmt.Println("put submissions")
}

func getJoke(w http.ResponseWriter, r *http.Request) {

	data := <-jokes
	fmt.Println(data.Title)
	json.NewEncoder(w).Encode(data)
}

func topUpJokes(w http.ResponseWriter, r *http.Request) {
	updateJokes(10)
}

func createCommand(w http.ResponseWriter, r *http.Request) {
	var newCommand command
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error making command invalid data: ", w)
	}
	json.Unmarshal(body, &newCommand)
	commands <- newCommand
	fmt.Println("app gave a new command")
	// w.WriteHeader(http.StatusCreated)
	// json.NewEncoder(w).Encode(newCommand)
}

func getCommand(w http.ResponseWriter, r *http.Request) {
	data := <-commands
	json.NewEncoder(w).Encode(data)
	fmt.Println("command sent to robot")
}

func main() {
	jokes = make(chan joke, 100)
	commands = make(chan command, 100)
	updateJokes(10)
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/joke", getJoke)
	router.HandleFunc("/topup", topUpJokes)
	router.HandleFunc("/app/putcommand", createCommand)
	router.HandleFunc("/robot/getcommand", getCommand)
	log.Fatal(http.ListenAndServe(":5000", router))

}
