Phase 4
---
HEROKU LINK：
https://courtbooking.herokuapp.com/

How to run?
1. npm install
2. npm start
3. Run 'initialize' script in script folder

Some features may be confusing:
* Type court name in Quick seach bar, press enter to seach 
* Court need to be logged in to check
* Default admin, studentnumber: 100, password:admin
* Click anywhere else to close login popup

Phase 3
---
Implemented features: 

* create uesrs
* delete users
* hashed password
* login/log out
* check court
* post comments to a court
* get comments
* edit/delete court by admin
* delete users by admin
* delete booking by admin
* search
* post news by admin
* get all news
* add booking
* view booking
* edit/delete booking
* search courts by name

Due to problem with cURL, the test script may not run properly. We used Postman for testing and attached the screenshots of api responses.


Phase 2
---


Yunhao: Search page, header page

Wenxi: Court page, profile page, admin page

JiaXin: Booking page, Calendar page

Meng: Dashboard page, login page

---

Booking page:

 For now, the date can be chosen by clicking on the calendar. The time should be entered by
the user and there is a validation of the form. Also, users can check the availability on a
specific date. We are planning to show a small day-calendar showing the avaiablity. However,
we need the data to generate the valid time periods. So we are gonna impelent this feature in the 
backend. Also, Clicking Back will go to the court page.

Confirmation page:

Show the confirmation

Search Page:

Seach results are hard coded right now, however they are only templates and with backend it will be dynamic generated

Header TODO:

The header will be embedded into every page, however it need backend to achieve that.
 
Admin Page:

All the court info and user info are hard coded and can not be modified right now. After backend is implemented, the Admin page will be able to display all the information in the database and the admin will be able to make changes and save them.

The access to the Admin page will only be granted to admin users. The backend will keep track of user type and display the link only to admin users.

Profile Page:
    
Users can change and save their profile info with support of backend.

Court Page:

Court page will be generated dynamically when court info is added to the database.

--

Dashboard:
  There are two layers of dashboard, before login and after login.
  Before login, we only display the information of four sample courts, which will navigates to the court page if clicked. 
  After login, users could view their booking history or news from the admin. In the front end, we only display some sample information.

Login:
  Login page is embedded in the dashboard page in the front end. It is accessed through clicking the login button. Username and password(in the hidden form) are required if user wants to login. What’s more, user can access the register page by clicking the register button in the login page. In the register page, users could type his/her username, password(hidden), re-typed password(check if same as previous password), email address(check if the form satisfied), phone number(optional, check if the form satisfied), and the student number(check if the form satisfied). Since we only have the front end, account verification is not complete. 
