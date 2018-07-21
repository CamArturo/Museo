const Nightmare = require("nightmare");
const nightmare = Nightmare({show: true});

const callNightmare = (url) => {
  return nightmare
    .goto(url)
    .wait(300)
    .evaluate(() => {
      const listAnchors = document.querySelectorAll("section.grid aside a");
      const listImgs = document.querySelectorAll("section.grid aside a img");
      // const listTitles = document.querySelectorAll("div.info header.card-header h1 a");
      const listInfo = document.querySelectorAll("div.info header.card-header");

      const anchors = [].slice.call(listAnchors);
      const images = [].slice.call(listImgs);
      const info = [].slice.call(listInfo);

      const pageLinksRaw = anchors.map(page => page.href); //for some reason each link has a dupe...
      const pageLinks = pageLinksRaw.filter((link, index) => index % 2 === 0);

      const imageLinks = images.map(image => image.src);
      const titleText = info.map(title => title.children[1].innerText);
      const years = info.map(year => year.children[2].innerText);
      const artists = info.map(artist => artist.children[3].innerText);
      // const category = this.category

      const dataRaw = pageLinks.map((link, index) => {
        return {
          page_link: link,
          image_link: imageLinks[index],
          artist: artists[index],
          year: years[index],
          title: titleText[index]
        };
      });

      return dataRaw.reduce((acc, art) => { //remove extraneous links in data 
        if (art.image_link) {
          acc.push(art);
        }

        return acc;
      }, []);
    });
};

module.exports = {callNightmare};
