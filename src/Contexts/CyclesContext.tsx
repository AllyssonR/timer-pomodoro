import { ReactNode, createContext, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  finishedDate?: Date
  interrupedDate?: Date
}
interface CreateCycleData {
  task: string
  minutesAmount: number
}
interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | null | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrrnetCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}
export const CycleContext = createContext({} as CycleContextType)
interface CycleContextProviderProps {
  children: ReactNode
}
export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setIsActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function markCurrrnetCycleAsFinished() {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    })
  }
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setIsActiveCycleId(newCycle.id)
    // reset()
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setAmountSecondsPassed(0)
    setIsActiveCycleId(null)
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycleId,
        activeCycle,
        markCurrrnetCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
