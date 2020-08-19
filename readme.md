# Colaborate

[Event request generator page](https://wrap20.web.app/request)
[Event request on Google forms](https://forms.gle/JDjMavk3hNTQ23aJ7)


## Using pull request
1. fork or clone the repository
2. add the event to data.json on event array
3. create a pull request on event branch
4. wait until review and/or merge

## Using issue
1. Create a issue with "[event-request]" on the title and include something about the event you want to be added (Should include: title, description, date, links and image links)
2. Wait for review

## Using JSON generator page
1. Go to [Event request generator page](https://wrap20.web.app/request) fill the form and copy the genarated JSON
2. use one of the above options to send the generated data
    _later may be available a way to directly submit_
3. wait untuil review and merge

## Using Google Forms
1. Go to [Event request on Google forms](https://forms.gle/JDjMavk3hNTQ23aJ7), fill up the form and submit
2. wait until merge to list



## Event data example

```json
{
    "id": "[id suggestion or random, a id must be unique and will be added at merge]",
    "title": "Example",
    "month": "january",
    "date": {
        // [remove this comment if copy] for higher precision and better date presentation, timestamp is required, you can get the current timestamp by opening browser console on page/element inspector (ctrl+shift+i, F12...) and using the command: Date.now() on console tab
        "timestamp": 1596995834983,
        "from": "2020/08/07 ~10:00 [event start]",
        "to": "2020/08/08 ~10:00 [event ended, use '~' to indicate aproximated]"
    },
    "description": {
        "short": "A quick descripion to show on each row of list, try keep under 100 chars",
        "long": "A longer description with some info about the event"
    },
    "local": [
        "US"
    ],
    "tags": [
        "example",
        "test",
    ],
    "links":[
        {
            "url":"https://example.com",
            "title":"example"
        }
    ],
    "images":[
        {
            "url":"https://example.com",
            "title":"image of example"
        }
    ],
},
```