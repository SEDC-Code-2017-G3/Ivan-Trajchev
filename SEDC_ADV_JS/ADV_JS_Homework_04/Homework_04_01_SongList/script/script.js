"use strict";
$(function () {
    async function getData(fn) {
        return await $.ajax({
            method: "GET",
            url: "http://demo6418849.mockable.io/songs",
            success: data => data,
            error: error => error
        });
    }

    var reverseList = list => div => printTable(list.reverse(), div);

    function printTable(list, div, sortFn) {
        if (sortFn != null) list = list.sort(sortFn);
        div.html("");
        list.map(song => {
            let row = $("<tr>");
            $("<td>").text(song.rank).appendTo(row);
            $("<td>").text(song.song).appendTo(row);
            $("<td>").text(song.artist).appendTo(row);
            $("<td>").text(song.releaseYear).appendTo(row);
            $("<td>").text(song.duration).appendTo(row);
            div.append(row);
        });
        return list;
    }

    function sortData(list, div, evt) {
        let sortArray = ["rank", "song", "artist", "releaseYear", "duration"];
        let val = parseInt(evt.target.value);
        let sortBy = sortArray[val - 1];
        let sortFn;
        if (val != 5) {
            sortFn = (songA, songB) => isNaN(songA[sortBy]) ?
                songA[sortBy].localeCompare(songB[sortBy]) :
                parseInt(songA[sortBy]) - parseInt(songB[sortBy]);
        } else {
            sortFn = (songA, songB) => evalTime(songA.duration) - evalTime(songB.duration);
        }

        function evalTime(time) {
            let timeArray = time.split(":").map(x => parseInt(x));
            return (timeArray[0] * 60) + timeArray[1];
        }
        printTable(list, div, sortFn);
    }

    let songList = [{
        rank: "NO DATA!"
    }];
    const tBody = $("#tbody");

    $("#pull").on("click", async () => {
            return songList = await getData()
                .then((value) => printTable(value, tBody))
    });
    $("#sort").on("change", (evt) => sortData(songList, tBody, evt));
    $("[name='minmax']").on("change", () => reverseList(songList)(tBody));
});