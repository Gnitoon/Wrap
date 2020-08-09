/**
 * @description data to be listed
 * some things may be placed in another file,
 * as example, one dedicated to links and other to image links
 * then, it should be an array of objects containing the event id and array of links and/or images
 * 
 * 
 * 
 * Why use a JS file (instead of JSON or database)?
 * 
 * * Can be edited easier,
 * * support comments,
 * * can be used directly,
 * * can be served static in a cdn and load faster depending on the amount of data
 * * 'native support' on front end,
 * * not need to work with database
 * * easies to collaborate
 * 
 * and cuz i want to do this quickly without worry about APIs and databases and all that stuff,
 * i'm already working on a API and want to relief a bit ¯\_(ツ)_/¯
 * 
 * NOT MEANS IT ALWAYS BE A JS FILE, MAYBE AT SOME POINT CAN BE 
 * CONVERTED TO DATABASE
 * 
 * 
 * 
 *  
 * 
 */

data = {
    updated: "2020/08/07",
    lang:"en",
    // the events should be an array of objects
    events:[
        {
            id:"example",
            title:"thisIsAtest055",
            month:"january",
            date:{
                // of course, this isnt a real timestamp, just for placehold..., add a real one
                // copying from Date.now() on your browser console 
                timestamp:1596995834983,
                // from is used as default in UI
                from:"2020/08/07 ~10:00, prefer timestamp and use '~' before date/time for aproximated",
                to:"2020/08/08 ~10:00"

            },
            
            description:{
                short:"A quick descripion to show on each row",
                long: "A longer description with some info about the event"
            },
            local:[
                'US, NY',
                'All counries',
                'unknown'
            ],
            tags:[
                'example',
                'test'
            ],

        },
        {
            id:"example2",
            title:"Another example",
            month:"feb",
            date:{
                // of course, this isnt a real timestamp, just for placehold..., add a real one
                // copying from Date.now() on your browser console 
                timestamp:1596995834983,
                // from is used as default in UI
                from:"2020/08/07 ~10:00, prefer timestamp and use '~' before date/time for aproximated",
                to:"2020/08/08 ~10:00"

            },
            
            description:{
                short:"A quick descripion to show on each row",
                long: "A longer description with some info about the event"
            },
            local:[
                'US, NY',
                'All counries',
                'unknown'
            ],
            tags:[
                'example',
                'test'
            ],

        }
    ]
}