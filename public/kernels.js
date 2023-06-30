// Tour Options
export const tour = {
    startEl: '#startTourBtn', // (required) "Start Tour" element ID
    startEvent: 'click', // Specify DOM event to start tour, defaults to click
    highlightColor: '#0094FF', // must be a valid 6-digit CSS hex code or set to null
    debug: true, // toggles debug logging
    loaderColor: '#0094FF',
    ttOptions: {
        hasClose: true, // adds X (closes tour) to each tooltip
        hasStepCount: true, // displays dynamic step count (e.g. 1 of 13) on bottom of each tooltip
        hasExit: true, // exit button on last tooltip (regardless of hasClose)
        bgColor: '#000000',
        textColor: '#FFFFFF',
        minWidth: '200px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 'bold',
        linkColor: 'green',
        hoverColor: 'white'
    }
}
/*
    {
        el: `#button`, // (required) id or class to showcase
        loc: `right`, // Where to display tootltip: e.g. left, top, right, bottom (will flip to other side if not enough space)
        title: `Kernel 1 (One)`, // (required) Title appears on top left of tooltip
        content: `lorem ipsum` // (required) Content for each tooltip, html allowed in backticks,
        url: `/` // (required) what page the tooltip should appear on (where your showcased element is),
        maxWidth: `500px`, this allows content to fit within a reasonable space
        maxHeight: `300px`, this allows content to fit within a reasonable space
    }
*/
// Kernel = each tooltip's options/content
export const kernels =  [
    {
        el: '#button',
        loc: 'right',
        title: 'Kernel 1 (One)',
        content: `lorem ipsum <a href="https://www.google.com" target="blank">sit</a> amet dolar`,
        url: '/'
    },
    {
        el: '#button2',
        loc: 'bottom',
        title: 'Set Width and Height',
        content: `
            Orville Redenbacher once said "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mauris ex, vestibulum et est sed, scelerisque tincidunt ipsum. Aliquam lacus felis, lacinia sit amet accumsan in, tristique vitae ante. Curabitur dignissim nibh libero, facilisis vehicula diam lobortis et.
            <br><br> Maecenas nulla enim, tempor at sodales a, vehicula ut justo. Etiam a euismod orci. Phasellus a enim et odio mollis imperdiet. Cras tempor orci a elit dictum, ac congue nisi dictum. Pellentesque efficitur maximus magna, sit amet viverra leo aliquam ultrices.<br /><br />
            Praesent iaculis auctor posuere. Curabitur euismod eros neque, porta blandit orci tristique quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed facilisis, nunc in scelerisque ultricies, est orci suscipit neque, sed blandit sem quam vel leo."
        `,
        url: '/',
        width: '600px',
        height: '300px'
    },
    {
        el: '#button3',
        loc: 'bottom',
        title: 'Max Width and Height',
        content: `
            Orville Redenbacher once said "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mauris ex, vestibulum et est sed, scelerisque tincidunt ipsum. Aliquam lacus felis, lacinia sit amet accumsan in, tristique vitae ante. Curabitur dignissim nibh libero, facilisis vehicula diam lobortis et.
            <br><br> Maecenas nulla enim, tempor at sodales a, vehicula ut justo. Etiam a euismod orci. Phasellus a enim et odio mollis imperdiet. Cras tempor orci a elit dictum, ac congue nisi dictum. Pellentesque efficitur maximus magna, sit amet viverra leo aliquam ultrices.<br /><br />
            Praesent iaculis auctor posuere. Curabitur euismod eros neque, porta blandit orci tristique quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed facilisis, nunc in scelerisque ultricies, est orci suscipit neque, sed blandit sem quam vel leo."
        `,
        url: '/',
        maxWidth: '500px',
        maxHeight: '200px'
    },
    {
        el: '#input1',
        loc: 'bottom',
        title: 'First Input',
        content: `who's on first`,
        url: '/about'
    },
    {
        el: '#input2',
        loc: 'bottom',
        title: '2nd Input',
        content: `What's on second?`,
        url: '/about'
    },
    {
        el: '#button3',
        loc: 'bottom',
        title: 'Third Button',
        content: `I Don't Know's on third`,
        url: '/'
    }
]