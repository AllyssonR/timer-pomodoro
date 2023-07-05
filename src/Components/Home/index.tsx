import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

import { createContext, useState } from 'react'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
}

/*
 Prop Drilling -> Quando a gente tem MUITAS propriedades APENAS para comunicação entre compoponentes
 Context API -> Permite compartilharmos informações entre VARIOS componentes ao mesmo tempo
*/
interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}
export const CyclesContext = createContext({} as CycleContextType)
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O Ciclo precisa ser no minimo 5 minutos')
    .max(60, 'O intervalo precisa ser no máximo 60 minutos'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
// eslint-disable-next-line react-hooks/rules-of-hooks
const newCycleForm = useForm<NewCycleFormData>({
  resolver: zodResolver(newCycleFormValidationSchema),
  defaultValues: {
    task: '',
    minutesAmount: 0,
  },
})
const { handleSubmit, watch, reset } = newCycleForm

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }
  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }
  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            <span>Começar</span>
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
