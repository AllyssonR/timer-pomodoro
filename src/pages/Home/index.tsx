import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  InterruptedCountdownButton,
} from './styles'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { CycleContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CycleContext)
  const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z
      .number()
      .min(5, 'O intervalo precisa ser no minimo 5 minutos')
      .max(60, 'O intervalo precisa ser no maximo 60 minutos'),
  })
  type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
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
          <InterruptedCountdownButton
            onClick={interruptCurrentCycle}
            type="button"
          >
            <HandPalm size={24} />
            Interromper
          </InterruptedCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
