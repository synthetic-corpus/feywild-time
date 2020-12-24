# feywild-time

I like to play Dungeons and Dragons. This creates the need to keep track of in game time on a fictional world calendar known as "the Calendar of Harptos." As additionall challenge for Dungeons Master's must also keep track of time in a magical, narnia, like place called "the Feywild." A 24 hour period may not have normal day/night cyclces. It could be a perptual sunny afternoon, a slow cycle between twilight or midnight, or forever cool fall sunset. If players spend time in one of these magical places in the feywild, they may return to the normal world, and find that several days have passed on the Harptos Calendar.

For more information about Dungeons and Dragons please visit:
https://dndbeyond.com
https://forgottenrealms.fandom.com/wiki/Main_Page
https://www.youtube.com/watch?v=OoW2CDgztKY

## API and Scope
This project contains two CRUD APIs that work in parrallel. The first is to keep track of the Calendar of Harptos, the second is to keep track of the various locations in the Feywild, each one will have its own "Calendar.". Eventually this project will have a front end, which will advanced time across all calendar with one click. It will also calculate how many additional days will pass on the Harptos Calendar, depending on where players are in the Feywild.

What this project does not have is a completed front end. The current front end exists primarily to allow testers to log on, get a JSON token, and use it for testing of the API via postman.

Testers will also be able to check the optional ability to upload photos to FeyWild Calendars.

## Harptos Calendars.

A Harptos Calendar, represented as typescript interface, looks like this:
```typescript
{
    createdAt: string,
    harptosID: string,
    userID: string,
    currentDay: number,
    harptosYear: number,
    days: HarptosDay[]
}
```
"current Day" represents the number of the day, relative to the Year, and corresponds to the index of the array "days."

A Harptos Day looks like this:
```typescript
{
    month: string,
    dayNumber: number,
    season: string
}
```
Here "dayNumber" refers to the number of the day relative to the month.

The HaptosDay[] array is filled out automatically by the back end and does not require input from the user at creation.

Dungeon masters will typically only have one Harptos Calendar.

## Feywild Calendar

Each Calendar Represents a specific place with in the Fey Wild. Dungeon Master may have as many as needed, and each one requires input. A FeywildCalendar looks like this:
```typescript
{
    createdAt: string,
    feywildID: string,
    feywildName: string,
    userID: string,
    dilation: Dilation,
    currentSegment: number,
    feySegments: FeywildSegment[],
    feyImage?: string // name of the image
}
```
A Dilation is an object that represents dice rolls. These are used to calculate how days pass in the normal world if time is spent here. For instance a dilation of:
```typescript
{
    sides: 4,
    rolls: 2,
    add: -1
}
```
Means *"Roll a 4 sided dice twice. Add the results and subtract 1."*

FeySegments represent 24 hour periods in the Fey. They record the sun/moon position, the weather, and notes private to the DM.

When combined, it allows the DM to create strange places. The example below represent a place in the Feywild that is in a perptual fall party. If players spend time here, they may lose up to four days in the real world.

```typescript
{
    createAt: <timeStamp>,
    feywildID: <UniqueID>,
    userID: <UserID>
    feywildName: "Dryad's Party Grove."
    dilation: {
        sides: 4,
        rolls: 1,
        add: 0
    },
    currentSegment: 0,
    feySegments: [
        {
            astronmics: "Sun Sets",
            weather: "Cool Fall Evening",
            notes: "Sun is going down! Time to party!"
        },
        {
            astronmics: "Twilight",
            weather: "Cool Fall Evening",
            notes: "Bonfires mysteriously ignite!"
        },
        {
            astronmics: "Starry Night",
            weather: "Cool Fall Night",
            notes: "Fey Musicans make everyone dance. Players must make wisdom check or are compelled to party."
        },
        {
            astronmics: "Midnight",
            weather: "Cool Fall Night",
            notes: "Night Shade Dryads come out!"
        },
        {
            astronmics: "Sunrise",
            weather: "Misty fall Morning",
            notes: "Sun is rising! Time to Party!"
        },
        {
            astronmics: "Sun at noon",
            weather: "Fall Afternoon",
            notes: "Bonfires mysteriously rebuild themselves..."
        },
    ]
}
```

# How to Test

## Postman set up



Postman set up requires two environment Variables. The first is the API url which should be:
``` https://2acnfm1f3b.execute-api.us-west-2.amazonaws.com/ ```
*...including* the trailing slash.

The second is the Token, which should be *only* the JSON token from the front end, *not* something like "Bearer <token>"

## Get Token

To get a Token, navigate to the client directory.
Run ```npm install``` followed by ```npm start``` to load the Angular front end application. Navigate to ```http://localhost:4200``` and use the Login button. After your first login, you should see the token appear in the web console.

Use this token for all tests via postman.

## Where are the Tests?

A postman tests file can be found under "Postman Collection."

# Run Tests

## Harptos Calendar CRUD tests

The Harptos Calendar requires little interaction from the user. Simply start with the Post request. A Harptos Calendar will be returned to you, including its HarptosID, which is the PK for get, delete, and update requests.

Relevant update and post objects are already provided, But there are here for reference.

Post:
```typescript
    {
        day: number,
        year: number
    }
```

Update:
```typescript
    {
        currentDay: number,
        harptosYear: number,
        days: HarptosDay[]
    }
```

## Feywild Calendar CRUD tests

Sample post and update tests for Feywild are also provided, but tests are encouraged to create additional Feywild zones based on whatevery whimsy they think of.

The Feywild Get all Requests will return everything by userID, and you can use feywildID for patch, get, delete, and signed url requests.

The body for both a post and update requests are the same

update/post
```typescript
    {
        feywildName: string,
        dilation: Dilation,
        currentSegment: number,
        feySegments: FeySegment
    }

    FeywildSegment {
        astronomics: string /* represents position of sun/moon or day/night */
        weather: string /* what season is the fey wild apparently in*/
        notes: string
    }

    export interface Dilation {
        sides: number, // Sides on Dice
        rolls: number, // Number of rolls
        add: number // add to or subtract from total rolls e.g. 
}
```

## Feywild Optional Image Test

The path to get an Upload URL requires a FeywildID of an existing Feywild Calendar.

The body of the request should be:

```typescript
    {
        feywildImage: string
    }
```
Whereas the "string" is the name of the image you wish to upload.

**Important** the API does not use the same name for generating the s3 Upload URL. It prepends the FeywildID in front of it in order to generate a unique image name. Consequently, the image to be uploaded must be manually rennamed prior to using the signed URL

In a completed project, the rennaming of the actual file would be handled in the front end.

Thanks for testing my project!