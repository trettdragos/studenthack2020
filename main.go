package main

import (
	// "fmt"
	// "os"
	// "regexp"
	// htgotts "github.com/hegedustibor/htgo-tts"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/jzelinskie/geddit"
)

type joke struct {
	Title       string `json:"Title"`
	Description string `json:"Description"`
}

var jokes chan joke

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
	subOpts := geddit.ListingOptions{
		Limit: 10,
	}
	submissions, _ := session.SubredditSubmissions("jokes", geddit.HotSubmissions, subOpts)

	for i := 0; i < surplus; i++ {
		latest := joke{Title: submissions[i].Title, Description: submissions[i].Selftext}
		jokes <- latest
		fmt.Println(latest.Title)
	}
}

func getJoke(w http.ResponseWriter, r *http.Request) {

	data := <-jokes
	fmt.Println(data.Title)
	json.NewEncoder(w).Encode(data)
}

func main() {
	updateJokes(1)
	// router := mux.NewRouter().StrictSlash(true)
	// router.HandleFunc("/", getJoke)
	// log.Fatal(http.ListenAndServe(":8080", router))

}
