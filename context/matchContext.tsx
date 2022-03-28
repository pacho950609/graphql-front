import React, { useState, useEffect, useMemo } from 'react'
import client from '../apoloClient/apoloClient'; 
import { gql } from "@apollo/client";

export interface Player {
    id: string;
    name: String;
    lastName: String;
}

export interface Ranking {
    id: string;
    name: String;
    lastName: String;
    wins: number;
    losses: number;
}

const MatchContext = React.createContext<{players:Player[], ranking: Ranking[] }>({ players: [], ranking: [] });

export const MatchProvider = (props: any) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [ranking, setRanking] = useState<Ranking[]>([]);

    useEffect(() => {
        client.query({
            query: gql`
                {
                    getPlayers 
                    {
                        id
                        name
                        lastName
                    }

                    getRank 
                    {
                        id
                        name
                        lastName
                        wins
                        losses
                    }
                }
            `,
        }).then(response => {
            setPlayers(response.data.getPlayers)
            setRanking(response.data.getRank)
        }).catch(error=> {
            console.log('error', error)
        });
      
    }, []);

    const value = useMemo(() => {
        return {
            players,
            ranking,
        }
    }, [players, ranking]);

    return <MatchContext.Provider value={value} {...props} />
}

export const usePlayers = () => {
    const context = React.useContext(MatchContext);
    if(!context) {
        throw new Error('Component doesnt have access to usePlayers')
    }
    return context;
}