export interface MonthlyGoalBook {
    id: string;
    title: string;
    author: string;
    completed: boolean;
}

export interface MonthlyGoalMonth {
    month: string;
    books: MonthlyGoalBook[];
}