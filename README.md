Job Board
This project is a simple front-end application that allows users to search, filter, sort, and paginate a list of jobs. The application offers multiple interactive controls such as a search bar, dropdowns for filtering and sorting, and a reset button for clearing the filters.

Installation and Setup
To install and run the project locally, follow these steps:


1. Install Dependencies
   Install the required dependencies using npm:


npm install 


2. add[ API-Key and API-URL and BOARD-Key] in api/hrflowApi.js file 

3. Run the Project

To start the project on your local machine, run:


npm start
This will launch the application at http://localhost:3000 

Features
Search by Name:
Users can type into the search input to filter the list of items based on a keyword that matches the name of the items.

Filter by Category:
A dropdown menu is provided to filter items by a specific category.

Sort Items:
Another dropdown is available to sort items either by name, by date of creation,by campany, or by category.

Reset Filters:
A reset button is provided to clear all applied filters (search, category, sort) and return to the default view.

Select Items per Page:
Users can choose how many items to display per page (e.g., 5, 10, 20), with the default number of items set to 10.

Usage
Search by Name: Enter a name or keyword in the search input field, and the list will dynamically update to show only items that match the search term.

Filter by Category: Use the category dropdown to filter items based on a specific category AI / Research & Development, Artificial intelligence, Financial Services, Human Resources, Software engineering
.

Sort Items: Choose from the sorting dropdown to order the items based on criteria like by name, by date of creation,by campany, or by category.

Reset Filters: Click on the "Reset Filters" button to clear the search term, category filter, and sort order, returning the view to the default state.

Items per Page: Select how many items you want to view per page from the items-per-page dropdown, with the default number set to 10.

Technologies Used
HTML/CSS
JavaScript/React 


