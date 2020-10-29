import { Stage, Match, MatchGame, Participant } from "brackets-model";
import { BracketsViewer } from "./main";

declare global {
    interface Window {
        bracketsViewer: BracketsViewer,
    }
}

/**
 * The data to display with `brackets-viewer.js`
 */
export interface ViewerData {
    /** The stage to display. */
    stage: Stage,

    /** The matches of the stage to display. */
    matches: Match[],

    /** The games of the matches to display. */
    matchGames: MatchGame[],

    /** The participants who play in the stage to display. */
    participants: Participant[],
}

/**
 * The possible placements of a participant's origin.
 */
export type Placement = 'none' | 'before' | 'after';

/**
 * An optional config to provide to `brackets-viewer.js`
 */
export interface Config {
    /**
     * Where the position of a participant is placed relative to its name.
     * - If `none`, the position is not added.
     * - If `before`, the position is prepended before the participant name. "#1 Team"
     * - If `after`, the position is appended after the participant name, in parentheses. "Team (#1)"
     */
    participantOriginPlacement: Placement,

    /**
     * Whether to show the origin of a slot (wherever possible).
     */
    showSlotsOrigin: boolean,

    /**
     * Whether to show the origin of a slot (in the lower bracket of an elimination stage).
     */
    showLowerBracketSlotsOrigin: boolean,

    /**
     * Whether to highlight every instance of a participant on hover.
     */
    highlightParticipantOnHover: boolean,
}

/**
 * The possible types of connection between matches.
 */
export type ConnectionType = 'square' | 'straight' | false;

/**
 * The possible types of final.
 */
export type FinalType = 'consolation_final' | 'grand_final';

/**
 * A function returning an origin hint based on a participant's position.
 */
export type OriginHint = ((position: number) => string) | undefined;

/**
 * Contains the information about the connections of a match.
 */
export interface Connection {
    connectPrevious?: ConnectionType,
    connectNext?: ConnectionType,
}

/**
 * An item of the ranking.
 */
export interface RankingItem {
    [prop: string]: number,
    rank: number,
    id: number,
    played: number,
    wins: number,
    draws: number,
    losses: number,
    forfeits: number,
    scoreFor: number,
    scoreAgainst: number,
    scoreDifference: number,
    points: number,
}

/**
 * Contains information about a header of the ranking and its tooltip.
 */
export interface RankingHeader {
    text: string,
    tooltip: string,
}

/**
 * A formula which computes points given a ranking row.
 */
export type RankingFormula = (ranking: RankingItem) => number;

/**
 * An object mapping ranking properties to their header.
 */
export type RankingHeaders = { [name in keyof RankingItem]: RankingHeader };

/** 
 * An object mapping a participant id to its row in the ranking.
 */
export type RankingMap = { [id: number]: RankingItem };

/**
 * Definition of a ranking.
 */
export type Ranking = RankingItem[];