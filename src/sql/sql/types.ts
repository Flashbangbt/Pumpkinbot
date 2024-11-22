export interface CommandGroup {
    name: string;
    id: number;
    group_name: string;
}

export interface GroupResult {
    id: number;
}

export interface TimedCommand {
    id: number;
    command: string;
    interval: number;
    channel: string;
    last_run?: Date;
}