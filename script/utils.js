const $ = (selector) => {
    const target = document.querySelector(selector);

    target.on = (event, callback) => {
        target.addEventListener(event, callback);
    }


    target.clear = () => {
        target.innerHTML = ``;
        // console.log("I'm the clear function")
        return target;
    }

    return target;
}