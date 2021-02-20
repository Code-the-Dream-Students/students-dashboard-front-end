/** @format */

const makeDate = (date) => {
    console.log(date);

    let newDate;
    if (date.charAt(8) === "0") {
        newDate = date.slice(0, 8) + date.charAt(9);
        console.log(newDate);
    }
    newDate = new Date(newDate);
    newDate = newDate.setDate(newDate.getDate() + 1);
    let addedDate = new Date(newDate);
    return `${addedDate.getFullYear()}-${addedDate.getMonth()}-${addedDate.getDay()}`;
};
export default makeDate;
