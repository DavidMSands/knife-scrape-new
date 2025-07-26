import { inject, signal } from "@angular/core";
import { KnifeData } from "../../../interfaces/knife-data.type";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ChefsEdgeService } from "./chefs-edge.service";
import { catchError, of, pipe, switchMap, tap } from "rxjs";

type ChefsEdgeState = {
    knives: KnifeData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ChefsEdgeState = {
    knives: [],
    isLoading: false,
    error: null
};

export const chefsEdgeStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialState),
    withMethods((store, ceService = inject(ChefsEdgeService)) => ({
        loadKnives: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(() =>
                    ceService.getKnives().pipe(
                        tap((knives) => {
                            patchState(store, {
                                knives,
                                isLoading: false,
                                error: null
                            });
                        }),
                        catchError((error) => {
                            console.error('Failed to load knives:', error);
                            patchState(store, {
                                isLoading: false,
                                error: error?.message || 'Unknown error occurred'
                            });
                            return of([]);
                        })
                    )
                )
            )
        )
    })),
);