

# Spotify-Api-fetching 
Rushes Music Collection/Hive Helsinki      <img src="https://user-images.githubusercontent.com/81321172/165960699-d5ff0b5a-9b9b-4341-9b83-590dc5af6d35.png" width="10%"/>



## :diamond_shape_with_a_dot_inside: **Project's goal:**

This project is about using the API of a popular music streaming service
to print out a catalog of a user's saved albums. In our case we used Spotify.

## :arrow_forward: **Usage**

:arrow_right: create an application inside Spotify developer page

:arrow_right: add the redirecting url into the settings of the application

:arrow_right: copy the client id and client secret id into callback.html file and in login.js file

:arrow_right: enter the redirecting page into the browser

:arrow_right: if the creator of the application is the user, you may authorize yourself rightaway

:arrow_right: if the user is different, the user email needs to be added into the application on spotify developer page

## :page_with_curl: **How it's done:** 
We add the client id, secret id and redirecting url that works 
hand in hand with the **developer application on spotify**.

Then we create an authorizing page which receives the user logging on spotify, 
then we build the required url to fetch the user's access token.

After we receive the ```json``` repsond, we save it into the **local storage** of the browser.

Finally we use this storage to build **html elements** that will show 
the albums and each song of this album, and on click of any of these songs, 
it directs to spotify's web page to play this song.
