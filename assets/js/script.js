$(document).ready(function () {
    let valid = localStorage.getItem('validuser')
        i = 4;
    if (!(window.location.href === "file:///C:/Users/soura/OneDrive/Desktop/ajaxtask/football%20updates/index.html")) {
        if (!valid) {
            window.location.href = 'index.html';
        } else {}
    }
    $('.logout').click(function () {
        localStorage.clear();
        window.open('index.html');
    });
    $('.clubs-dropper').click(function () {
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                }
            }
        })
    });
    $('.clublistmenu').on('click', 'li', function () {
        i = 4;
        document.querySelector('.load-more').style.display = "block";
        let clubname = $(this).html();
        $('.team-info').html("");
        $('.team-performance-box').html("");
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    if (clubname === result.clubs[key].name) {
                        $('.team-info').append(
                            `<span class="team-name">Name: ${result.clubs[key].name}</span>
                                <span class="team-code">Code: ${result.clubs[key].code}</span>
                                <span class="country-name">${result.clubs[key].country}</span>`
                        );
                    }
                }
            }
        })
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.matches) {
                    if (result.matches[key].team1 === clubname || result.matches[key].team2 === clubname) {
                        $('.team-performance-box').append(
                            `<div class="team-results-match-info">
                                <span class="Round">Round: ${result.matches[key].round}</span>
                                <span class="match-date">Date:  ${result.matches[key].date}</span>
                                <span class="teams-involved">${result.matches[key].team1}: ${result.matches[key].team2}</span>
                                <span class="scores">${result.matches[key].score.ft[0]}:${result.matches[key].score.ft[1]}</spaan>
                            </div>`
                        )
                    }
                }      
            }
        })
    })
    $('.team-results').on('click', 'button', function () {
        i += 5;

        let team_result = document.querySelectorAll('.team-results-match-info'),
            team_result_length = team_result.length-1;
        for (j = 0; j <= i; j++) {
            team_result[j].style.display = "flex";
            if(j === team_result_length) {
                document.querySelector('.load-more').style.display = "none";
            }
        }
    })
    $('.matchdays-dropper').click(function () {
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data),
                 uniqueresult =[];
                 console.log(uniqueresult);
                for (key in result.matches) {
                        uniqueresult.push(result.matches[key].round);
                }
                let getuniquevalue =  [...new Set(uniqueresult)];
                for(key in getuniquevalue) {
                    $('.matchdays').append(`<li class='match-day'>${getuniquevalue[key]}</li>`);
                }
            }
        })
    });
    $('.matchdays').on('click', 'li', function () {
        i = 4;
        $('.match-result-box').html("");
        let match = $(this).html();
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.matches) {
                    if (result.matches[key].round === match) {
                        $('.match-result-box').append(
                            `<div class="match-result-details">
                                <span class="match-result-Round">Round: ${result.matches[key].round}</span>
                                <span class="match-result-date">Date: ${result.matches[key].date}</span>
                                <p class="match-result-teams">
                                    <a href="clublist.html?a=${result.matches[key].team1}" title="Team" target="_blank">${result.matches[key].team1} </a>:<a href="clublist.html"
                                        title="Team" target="_blank">${result.matches[key].team2} </a></p>
                                <span class="scores">${result.matches[key].score.ft[0]}:${result.matches[key].score.ft[1]}</span>
                            </div>`
                        )
                    }
                }
                $('.match-result-box').append(
                    `<button class="match-result-load-more">Show More</button> `
                )
            }
        })     
    })
    $('.match-result-box').on('click', 'button', function () {
        i += 5;
        let match_result = document.querySelectorAll('.match-result-details'),
            match_result_length = match_result.length-1;
        for (j = 0; j <= i; j++) {
            match_result[j].style.display = "flex";
            if(j === match_result_length) {
                document.querySelector('.match-result-load-more').style.display = "none";
            }
        }
       
    })
});

function login(event) {
    event.preventDefault();
    localStorage.setItem('username1', 'saurabh96');
    localStorage.setItem('password1', '123456');
    let user1 = localStorage.getItem('username1'),
        pass1 = localStorage.getItem('password1', '123456');
    event.preventDefault();
    let username = $('.username').val(),
        password = $('.password').val();
    if (username === user1 && password === pass1) {
        localStorage.setItem('validuser', 'true');
        window.open('homepage.html');
    } else {
        alert('invalid username or password');
        window.open('index.html');
    }
}