SILK REGENT LTD — NETLIFY DROP + EMAIL ROUTING GUIDE

This folder is ready to upload as a static website. The booking form is already
configured for Netlify Forms and the public contact address is:

info@silkregent.co.uk

The website does not contain your personal Gmail address or bank details.

PUBLIC STARTING PRICES

- Couples experiences start from £11,600 per couple.
- Executive retreats start from £8,500 per executive.
- These are the latest agency-fee-inclusive minimums rounded upward to the
  nearest £100.
- Individual package prices are intentionally not displayed. The final
  experience price is confirmed through a tailored written quotation.


STEP 1 — CREATE THE FREE EMAIL FORWARD IN PORKBUN

1. Sign in to Porkbun and open Domain Management.
2. Find silkregent.co.uk and select the envelope icon in the EMAIL column.
3. In "Create a New Forwarding Address", enter:
     Forwarding address / username: info
     Deliver to: your existing personal Gmail address
4. Select "Create Email Forward".
5. Send a test message to info@silkregent.co.uk FROM A DIFFERENT email address
   than the Gmail inbox receiving the forward. Using the same sending and
   receiving account can create a feedback-loop issue.

Porkbun help:
https://kb.porkbun.com/article/10-how-to-set-up-email-forwarding-service

Important: forwarding lets info@silkregent.co.uk RECEIVE messages at Gmail. It
does not by itself make Gmail send new messages from info@silkregent.co.uk.


STEP 2 — PUBLISH OR UPDATE THE SITE IN NETLIFY DROP

1. Unzip Silk_Regent_Netlify_Drop.zip.
2. Sign in to Netlify and open your EXISTING Silk Regent site.
3. Open the site's Deploys page and scroll to the deploy dropzone at the bottom.
4. Drag the UNZIPPED folder named "silk-regent-netlify-drop" into that dropzone.
   This updates the existing site. Do not use the general new-site Drop page if
   you want to preserve the current Netlify site and connected domain.
5. Open the site's Forms area.
6. Confirm that the active form named "booking-request" appears.
7. If form detection is disabled, enable it under:
     Forms > Usage and configuration > Form detection
   Then deploy the folder again.

Netlify manual-update help:
https://docs.netlify.com/welcome/add-new-site/#use-drag-and-drop

The form code already includes:
- name="booking-request"
- method="POST"
- data-netlify="true"
- a hidden form-name field
- a named email field, so notification replies can use the customer's address
- names on every customer input field
- a hidden honeypot field for additional spam protection
- UTF-8 support for English, Russian and Uzbek submissions
- a dedicated thank-you page

Netlify form setup:
https://docs.netlify.com/manage/forms/setup/


STEP 3 — SEND VERIFIED FORM SUBMISSIONS TO THE BUSINESS ADDRESS

1. In Netlify, open the Silk Regent website project.
2. Go to:
     Project configuration > Notifications > Emails and webhooks
3. Find "Form submission notifications" and select "Add notification".
4. Choose an email notification.
5. Set the event to verified form submissions.
6. Select the form "booking-request".
7. Set the destination email to:
     info@silkregent.co.uk
8. Save the notification.

Netlify notifications help:
https://docs.netlify.com/manage/forms/notifications/

Netlify sends the form notification to info@silkregent.co.uk. Porkbun then
forwards that message to the personal Gmail address configured in Step 1.


STEP 4 — RUN AN END-TO-END TEST

1. Open the published Silk Regent website in a private/incognito browser window.
2. Submit the booking form using a genuine email address and complete sentences.
3. In Netlify, confirm the request appears under:
     Forms > booking-request > Verified submissions
4. Confirm the notification reaches the personal Gmail inbox through the
   info@silkregent.co.uk Porkbun forward.
5. Reply to the notification and check that the reply is addressed to the
   customer's email, not to Netlify.
6. If the test is missing, check Netlify's Spam submissions list before making
   any code changes.


SECURITY AND PAYMENT NOTES

- The website does not take card payments and has no checkout system.
- Visitors are told not to submit bank, card or passport details.
- Bank-transfer instructions should only be sent after availability and the
  final quotation are confirmed in writing.
- Do not add your receiving bank details or personal Gmail address to the
  public HTML files.


PACKAGE FILES

- index.html: complete website and Netlify booking form
- styles.css: all website styling and responsive layouts
- script.js: language selector, package filter, booking buttons and share link
- thank-you.html: confirmation page after form submission
- favicon.svg: browser icon
- _headers: basic security and privacy headers
- README.txt: this setup and testing guide
