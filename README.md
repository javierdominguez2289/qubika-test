# qubika-test

# 1 Explanation:
First of all what i did was to create username and email adding a random number
Then i use the API to register the user with that data to avoid duplicated email errors
Verify the received 201 code that means user creation
With those credentials i login into club-administration app
Create category and subcategory using the same user data to avoid category duplication issues
Verify successfully toast is displayed
log the user email to the console for manual verification

# 2 Improvements:
Test Can be improved in several points, usign page object model to set and mantain the selectors of the elements, text values can be stored in a constant and describe / steps blocks can be set for readable purposes