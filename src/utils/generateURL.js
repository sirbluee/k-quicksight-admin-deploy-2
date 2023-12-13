import React from "react";
import moment from 'moment';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateBashURL(str) {
    if (str?.includes('https:') || str?.includes('http:') ) {
        return str;
    } else if (!str) {
        return 'https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg'
    }
    else {
        return `${process.env.NEXT_PUBLIC_BASE_URL}files/${str}`;
    }
}


const dateAsurRaaFormatOnlyDate = 'YYYY-MM-DD';
export const getTrimIntoColumnOnlyDate = (
    dateString
) => {
    if (!dateString) {
        return '';
    }
    const date = moment(dateString).format(dateAsurRaaFormatOnlyDate);

    if (date === 'Invalid date') {
        return '';
    }
    return date;
};