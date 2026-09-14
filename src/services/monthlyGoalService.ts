import { supabase } from "../supabase/client";
import type { MonthlyGoalMonth, MonthlyGoalBook } from "../types/MonthlyGoal";

export async function getMonthlyGoals(): Promise<MonthlyGoalMonth[]> {
    const { data, error } = await supabase
        .from("monthly_goals")
        .select("*")
        .order("month")
        .order("id");

    if (error) {
        throw error;
    }

    const goalsByMonth = new Map<string, MonthlyGoalBook[]>();

    data.forEach((goal) => {
        if (!goalsByMonth.has(goal.month)) {
            goalsByMonth.set(goal.month, []);
        }

        goalsByMonth.get(goal.month)!.push({
            id: goal.id,
            title: goal.title,
            author: goal.author,
            completed: goal.completed
        });
    });

    return Array.from(goalsByMonth.entries()).map(
        ([month, books]) => ({
            month,
            books
        })
    );
}

export async function addMonthlyGoal(
    month: string,
    title: string,
    author: string
): Promise<MonthlyGoalBook> {

    const { data, error } = await supabase
        .from("monthly_goals")
        .insert({
            month,
            title,
            author,
            completed: false
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return {
        id: data.id,
        title: data.title,
        author: data.author,
        completed: data.completed
    };
}

export async function updateMonthlyGoal(
    id: string,
    field: "title" | "author" | "completed",
    value: string | boolean
) {
    const { error } = await supabase
        .from("monthly_goals")
        .update({
            [field]: value
        })
        .eq("id", id);

    if (error) {
        throw error;
    }
}

export async function deleteMonthlyGoal(id: string) {
    const { error } = await supabase
        .from("monthly_goals")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
}