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
{
    createdAt: string,
    harptosID: string,
    userID: string,
    currentDay: number,
    harptosYear: number,
    days: HarptosDay[]
}

"current Day" represents the number of the day, relative to the Year, and corresponds to the index of the array "days."

A Harptos Day looks like this:
{
    month: string,
    dayNumber: number,
    season: string
}

Here "dayNumber" refers to the number of the day relative to the month.

The HaptosDay[] array is filled out automatically by the back end and does not require input from the user at creation.

Dungeon masters will typically only have one Harptos Calendar.

## Feywild Calendar

Each Calendar Represents a specific place with in the Fey Wild. Dungeon Master may have as many as needed, and each one requires input. A FeywildCalendar looks like this:

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

A Dilation is an object that represents dice rolls. These are used to calculate how days pass in the normal world if time is spent here. For instance a dilation of:
{
    sides: 4,
    rolls: 2,
    add: -1
}
Means "Roll a 4 sided dice twice. Add the results and subtract 1."

Fey Segments represent 24 hour periods in the Fey. They record the sun/moon position, the weather, and notes private to the DM.

When combined, it allows the DM to create strange places. The example below represent a place in the Feywild that is in a perptual fall party. If players spend time here, they may lose up to four days in the real world.

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
