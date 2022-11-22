export type User = {
    id: string;
    name: string;
    student_number: string;
    password: string;
    screen_size: string | null;
    last_screen_size: string | null;
    alert_focus: boolean;
    alert_screen_size: boolean;
}