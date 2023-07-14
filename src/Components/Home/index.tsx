import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useContext } from 'react'
import { CyclesContext } from '../../Contexts/CyclesContext'
/*
 Prop Drilling -> Quando a gente tem MUITAS propriedades APENAS para comunicação entre compoponentes
 Context API -> Permite compartilharmos informações entre VARIOS componentes ao mesmo tempo
*/

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
  const task = watch('task')
  const isSubmitDisabled = !task
  const { CreateNewCycle, InterruptCurrnetCycle, activeCycle } =
    useContext(CyclesContext)
  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data)
    reset()
  }
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountDownButton onClick={InterruptCurrnetCycle} type="button">
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
