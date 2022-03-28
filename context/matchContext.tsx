import React, { useState, useEffect, useMemo } from 'react'
import client from '../apolloClient/apolloClient'; 
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

export interface GameSet {
    firstPlayerPoints: number;
    secondPlayerPoints: number;
    setNumber: number;
}

const MatchContext = React.
    createContext<{
        players:Player[], 
        ranking: Ranking[], 
        createMatch: (params: { firstPlayerId: string; secondPlayerId:string; gameSets:  GameSet[]}) => void 
    }>({ players: [], ranking: [], createMatch: (params) => {}});

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

    const createMatch = async (params: { firstPlayerId: string; secondPlayerId:string; gameSets:  GameSet[]}) => {
        const { firstPlayerId , secondPlayerId, gameSets} = params;
        await client.mutate({
            context: {
                headers: {
                    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxMTk1ZDMzLTRhMzctNGFlYS04OTFiLTA3NWQwZGJlY2M3YSIsImlhdCI6MTY0ODM4MDg0Nn0.USdtRxpXtgaytrLxUnJNzDGovooSCWKT2v6gYuyWvWY'
                }
            },
            variables: {
                sets: gameSets,
                firstPlayerId,
                secondPlayerId,
            },
            mutation: gql`
                mutation CreateMatch($sets: [SetInput]!, $firstPlayerId: String!, $secondPlayerId: String!){
                    addMatch(input: {
                        firstPlayerId: $firstPlayerId
                        secondPlayerId: $secondPlayerId
                        sets: $sets
                    }) {
                        id
                        sets {
                            firstPlayerPoints
                            secondPlayerPoints
                            setNumber
                        }
                    }
                }
            `
        })

        const rankQuery = await client.query({
            query: gql`
                {
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
            fetchPolicy: 'network-only'
        });

        const rank = rankQuery.data.getRank
        setRanking(rank);
    }

    const value = useMemo(() => {
        return {
            players,
            ranking,
            createMatch,
        }
    }, [players, ranking]);

    return <MatchContext.Provider value={value} {...props} />
}

export const useMatch = () => {
    const context = React.useContext(MatchContext);
    if(!context) {
        throw new Error('Component doesnt have access to usePlayers')
    }
    return context;
}