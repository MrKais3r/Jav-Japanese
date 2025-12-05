package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello from Go backend!")
	})

	http.HandleFunc("/version", func(w http.ResponseWriter, r *http.Request) {
		response := map[string]string {
			"version": "v1.0",
			"name":    "Jav日本語",
			"status":  "ok",
		}

		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(response)
	})

	addr := ":8080"

	log.Printf("Go API running on %s\n", addr)

	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal(err)
	}
}