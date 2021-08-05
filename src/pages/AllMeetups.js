import { useState, useEffect } from "react";

import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
  // useState always returns array of size two with being the state and second function to update state
  // *** Component Function is recalled every time component state is changed!!!!!!
  const [isLoading, setIsLoading] = useState(true); // Set starting state to true
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  // First is function, second is array of dependencies
  useEffect(() => {
    setIsLoading(true);
    // Cannot use async await since every React component is synchronous
    // There fore MeetupList will require information immediately (before json returned)
    //  Could use load spinner in place

    // If const in here, pulling external data => dependecy and should be added to dep array

    // Only will be run under our defined circumstances
    fetch("https://meetup-site-af5af-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        // Handle promise
        return response.json();
      })
      .then((data) => {
        // json also sends a promise
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key] // spread operator - default js operator
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []); // No external dependencies - empty will only load effect first time on load, when ommitted -> no effect

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList items={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
