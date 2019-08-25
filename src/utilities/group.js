import dayjs from 'dayjs';

function getGroupsByDate(items) {
    const map = {};

    for (const item of items) {
        const date = dayjs(item.date).format('YYYY-MM-DD');

        if (!(date in map)) {
            map[date] = [];
        }

        map[date].push(item);
    }

    const groups = [];

    for (const date in map) {
        const group = map[date];

        groups.push({
            date: date,
            formattedDate: dayjs(date).format('dddd, D MMMM'),
            items: group
        });
    }

    groups.sort((a, b) => {
        if (b.date < a.date) { return -1; }

        if (b.date > a.date) { return 1; }

        return 0;
    });

    return groups;
}

export default {
    getGroupsByDate
};
