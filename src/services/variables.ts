import { Todo } from '../index.js';

let todos: Todo[] = [
    {
        id: 1,
        text: "Köp mjölk",
        date: "2025-07-17",
        time: "10:00",
        completed: false
    },
    {
        id: 2,
        text: "Möte med projektgrupp",
        date: "2025-07-18",
        time: "14:30",
        completed: false
    },
    {
        id: 3,
        text: "Lämna in rapport X",
        date: "2025-07-16", // Idag
        time: "17:00",
        completed: true // Avklarad
    },
    {
        id: 4,
        text: "Ring kundtjänst",
        date: "2025-07-19",
        time: "09:15",
        completed: false
    },
    {
        id: 5,
        text: "Träna på gymmet",
        date: "2025-07-20",
        time: "18:00",
        completed: false
    },
    {
        id: 6,
        text: "Boka tandläkare",
        date: "2025-07-21",
        time: "11:00",
        completed: false
    },
    {
        id: 7,
        text: "Vattna blommorna",
        date: "2025-07-15", // Igår
        time: "16:00",
        completed: true // Avklarad
    },
    {
        id: 8,
        text: "Planera middagsbjudning",
        date: "2025-07-22",
        time: "19:00",
        completed: false
    },
    {
        id: 9,
        text: "Skriv inköpslista",
        date: "2025-07-17",
        time: "08:30",
        completed: false
    },
    {
        id: 10,
        text: "Betala elräkningen",
        date: "2025-07-14", // Tidigare
        time: "23:59",
        completed: true // Avklarad
    }
];

export { todos };