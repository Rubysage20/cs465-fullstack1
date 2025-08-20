# Travlr Getaways - Full Stack Web Application with MEAN
For this project, I built a full stack web application called Travlr Getaways. It has two main sides: a customer-facing site where users can view trips and an Angular-based admin SPA where administrators can log in, add, edit, and manage trips. The backend runs on Node.js and Express, and I used MongoDB(NoSQL) for storing trips and user data.

In the final stage, I added JWT authentication s that only authorized admins can log in and make changes. This step really polished the application and made it feel closer to a professional system. 

## Architecture
Throughout this project, I worked with different types of frontend development:
* Static Express HTML pages: This was my starting point, simple but limited since everything was hard-coded.
* Handlebars templates with JSON: This let me eliminate repeated code by using partials and render dynamic data more cleanly.
* Angular SPA: This was the biggest step forward. It allowed for a motth, modern admin experience where data updates without refreshing the page.

For the backend, I chose MongoDb because it stores data in JSON-like documents. Since my application was already exchanging JSON between frontend and backend, MongoDB made the process feel natural and flexible compared to a relational database.

## Functionality
One of the biggest takeaways for me was learning how to connect the Angular frontend to the Express backend using services and Observables. At first, I was pulling in local data, but moving to API-driven data meant I had to adjust to working with asynchronous calls. Using Angular's TripDataService to subscribe to API responses taught me how to handle async data flow in a clean way. 

I also refactored my code several times to make it more efficient. For example, I pulled out the trip display logic into reusable Angular components like trip-card and trip-listing. That way, I didn't have to repeat the same UI code. The big benefit of this was scalability, if I needed to change how a trip looked, I only had to update that trip in one place.

## Testing
I used Postman to test API endpoints such as /api/trips, /api/trips/:tripCode, and /api/login. This helped me make sure the routes returned the right data and handled error correctly.

Adding JWT security made testing more challenging but also more realistic. I had to test scenarios where a valid token worked and where an expired or invalid token blocked access. That gave me a better understanding of how methods, endpoints, and security all tie together in a full stack app:

* **Methods** Defined what I wanted to do with the data (GET, POST, PUT, DELETE).
*  **Endpoints** Pointed to the resource in the API
*  **Security** Ensured only logged-in admins could make changes, keeping the data safe.

## Reflection
This course really pushed me forward as a developer. I walked away with skills that I can talk about in interviews and show in my portfolio:

* **Building a complete full stack application from start to finish**
*  **Designing and consuming RESTful APIs**
*  **Working with MongoDB and schemas**
*  **Adding security features like JWT authentication**
*  **Developing with Angular and creating reusable components**

I feel more confident now about full stack development and better prepared for my career as a cloud engineer. This project was a big step in showing me how the pieces of an application come together, and it's definitely something I'll showcase to employers. 
  

  
