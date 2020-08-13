# Colaborate

## The code way
1. fork or clone the repository
2. add the event to data.json on event array
3. create a pull request on event branch
4. wait until review and/or merge

## The non code friendly way
1. Create a issue with "[event-request]" on the title and include something about the event you want to be added (Should include: title, description, date, links and image links)
2. Wait for review

_A page to create events may be available soon_



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