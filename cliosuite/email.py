import requests
import re
import sys
import twilio
from twilio.rest import Client

def getMonth(i):
    if i=='01':
        return "January"

    elif i=='02':
         return "February"

    elif i=='03':
         return "March"

    elif i=='04':
        return "April"

    elif i=='05':
         return "May"

    elif i=='06':
         return "June"

    elif i=='07':
         return "July"

    elif i=='08':
         return "August"

    elif i=='09':
         return "September"

    elif i=='10':
         return "October"

    elif i=='11':
         return "November"

    elif i=='12':
         return "December"

    else:
        return "Month"

    
def send_simple_message(url, key, contactfname, contactlname, email, cCode, mobile, 
                        start_time, end_time, title, desc, callerfname, callerlname, callerEmail, 
                        callerCCode, callerMobile):
       
    _date_start = start_time.split('/')

    month_no = _date_start[0]
    month = getMonth(month_no)
    day = _date_start[1]
    _time = start_time.split('_')
    time = _time[1] + ' ' + _time[2]
    startTime = month+"-"+day+" "+time
    
    if(end_time != 'Not_mentioned'):
        _date_end = end_time.split('/')
        month_no_1 = _date_end[0]
        month_1 = getMonth(month_no_1)
        day_1 = _date_end[1]
        _time_1 = end_time.split('_')
        time_1 = _time_1[1] + ' ' + _time_1[2]
        endTime = month_1+"-"+day_1+" "+time_1
    else:
        endTime = end_time.replace('_',' ')

   # Your Account SID from twilio.com/console
    account_sid = "AC7fd23fde7060f8d0da918009fd519c26"
   # Your Auth Token from twilio.com/console
    auth_token = "801aa30a30661196ea95b6b4ec45b1b8"

    client = Client(account_sid, auth_token)

    message = client.messages.create(
                              body='Your appointment is coming up on ' + month + ' ' + day + ' at ' + time,
                              from_='whatsapp:+14155238886',
                              to='whatsapp:' + '+' + cCode + '-' + mobile
                          )

    print(message.sid)

    name = contactfname + " " + contactlname
    manager = callerfname + " " + callerlname
    return requests.post(
                "https://api.mailgun.net/v3/sandboxc64076989bec4f529b24152b06430991.mailgun.org/messages",
                auth=("api", "ddf79808ecf3165c8bd542ac2e6a1292-f8faf5ef-a4af43dc"),
                data={"from": "Cliosuite Web Collaboration and Support <mailgun@sandboxc64076989bec4f529b24152b06430991.mailgun.org>",
                        "to": email,
                        "cc": callerEmail,
                        "subject": "Cliosuite video call has been scheduled. Title: " + title.replace('_', ' '),
                        "text": "Hello " + name + ", Call details: Organizer - " + manager +
                        ", Start Date - " + startTime + ", End Date - " +endTime+"."+
                        "Your Passcode is " + key +
                        ". Call Link - " + url + 
                        ". To reschedule the call, please contact the organizer at " +
                        callerEmail + " or " + callerCCode + "-" +callerMobile+"+. Call message: \""+
                        desc.replace('_', ' ')+"\". Thanks!"})


send_simple_message(str(sys.argv[1]), str(sys.argv[2]), str(sys.argv[3]), str(sys.argv[4]), 
                    str(sys.argv[5]), str(sys.argv[6]), str(sys.argv[7]), str(sys.argv[8]), 
                    str(sys.argv[9]), str(sys.argv[10]), str(sys.argv[11]), str(sys.argv[12]), 
                    str(sys.argv[13]), str(sys.argv[14]), str(sys.argv[15]), str(sys.argv[16]))
