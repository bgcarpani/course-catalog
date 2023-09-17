export type Course = {
    courseId: number;
    courseName: string;
    professorId: number;
    professorName: string;
    professorEmail: string;
    roomId: number;
    roomNumber: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}

export type Professor = {
    professorId: number;
    professorName: string;
    professorEmail: string;
};

export type Room = {
    roomId: number;
    roomNumber: string;
};