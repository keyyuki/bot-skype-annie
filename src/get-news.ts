import {parse} from 'node-html-parser';
import * as RssParser from 'rss-parser';

const rssParser = new RssParser();
const links = {
    ForbesNews: 'https://forbesvietnam.com.vn/rss/tin-moi-1.rss',
    Cafef: 'https://cafef.vn/trang-chu.rss',
    CafefVimo: 'https://cafef.vn/vi-mo-dau-tu.rss',
    CafefBatdongsan: 'https://cafef.vn/bat-dong-san.rss',
    Cafeftg: 'https://cafef.vn/tai-chinh-quoc-te.rss',
    CafefNews: 'https://cafef.vn/thoi-su.rss'

};

const contentToText = (html: string) => {
    const element = parse('<div>' + html + '</div>');
    return element.text.trim();
};
export const ComposeNews = async () => {
    const linksArr = Object.values(links);
    const i = Math.round(Math.random() * 10) % linksArr.length;
    const rss = await rssParser.parseURL(linksArr[i]);
    const dess = rss.items.map((item) => contentToText(item.content)).splice(0, 5);
    return dess;
};
