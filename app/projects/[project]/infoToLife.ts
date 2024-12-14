export const infoToLife = (info: string) => {
    const stringToArray: string[] = info.split(" ");
    for (let i = 0; i < stringToArray.length; i++) {
        if (stringToArray[i].includes("MVP")) {
            stringToArray[i] = `<span style="color: limegreen;">${stringToArray[i]}</span>`;
        }

        if (stringToArray[i].includes("Life")) {
            stringToArray[i] = `<span style="font-family: sans-serif; background: linear-gradient(45deg, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${stringToArray[i]}`
        }

        if (stringToArray[i].includes("Lesson:")) {
            stringToArray[i] = `${stringToArray[i]}</span>`
        }
    }

    const completeString = stringToArray.join(" ");

    return completeString;
};