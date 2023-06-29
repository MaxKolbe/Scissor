# SCISSOR
Welcome to scissor. A simple, seamless url-shortener and qr-code generator. 

## FUNCTIONALITIES 
- URL Shortening
Scissor allows users to shorten URLs by pasting a long URL into the Scissor platform and a shorter URL gets generated when the 'Get Link' button. 
- Custom URLs
Scissor also allows users to customize their shortened URLs. Users can choose their own custom domain name and customize the URL to reflect their brand or content.
- QR Code Generation:
Scissor allows users to also generate QR codes for the shortened URLs. 
- Link History
Scissor allows users to see the history of links they’ve created so they can easily find and reuse links they have previously created
- Analytics
Scissor provides basic analytics that allow users to track their shortened URL's performance. Users can see how many clicks their shortened URL has received and the IP addresses from where the clicks are coming from. This is available in the 'History' tab.

## DEPLOYMENT 
You can find the live site [here](https://scissor-u7ar.onrender.com/scissor)

## API ROUTES 
### GET /history
Retrieves all urls that have been shortened, including, ipaddresses and number of clicks. It is the postlude to the GET /:url route
### GET /:url
Responsible for redirecting from the shortened url to proper locations. It saves all necessary information available in the /history
### POST /basicUrl
Creates random shortened url versions
### POST /customUrl
Creates custom shortened url versions
### POST /qrcode
Creates qrcode for urls using the 'qrcode' module

## INSTRUCTIONS 
### Please carefully read the instructions
*Paste your url into the textbox labelled "Paste Url Here". 
Click on the associated button to retrieve a shortened version of your url.
*For custom url, input a custom name for your url in the textbox labelled "Enter your custom url". 
Click on the associated button to retrieve a shortened version of your url. 
*For the qrcode generator, Paste your url into the textbox labelled "Paste Url Here". 
Click on the "Get Qr Code" button. 