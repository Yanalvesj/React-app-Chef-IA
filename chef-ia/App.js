  import { StatusBar } from 'expo-status-bar';
  import { useState } from 'react';
  import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
  import axios from 'axios'
  const GROQ_API_KEY = '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';
  export default function App() {

    const [ingredientes, setIngedientes]= useState("")
    const [receita, setReceita]= useState("")

    const api= axios.create({
      baseURL: 'https://api.groq.com/openai/v1',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      }
    })

    async function gerarReceita(){
      const resposta = await api.post('chat/completions',{
        model: "llama-3.1-8b-instant",
        messages: [
          {
          role: 'system',
          content: `
            Você é um Chef profissional de alta gastronomia.
            Seu nome é Chef IA.

            Sua função é criar receitas completas, criativas e bem explicadas
            baseadas APENAS nos ingredientes fornecidos pelo usuário.

            REGRAS OBRIGATÓRIAS:

            1. Sempre responda em português do Brasil.
            2. Seja carismático e fale como um chef experiente.
            3. Organize a resposta com formatação clara.
            4. Nunca explique o que você está fazendo, apenas entregue a receita.
            5. Caso falte algum ingrediente essencial, sugira substituições simples.

            FORMATAÇÃO OBRIGATÓRIA DA RESPOSTA:

            🍽️ NOME DA RECEITA
            (linha em branco)

            📝 Descrição
            Breve descrição apetitosa da receita em até 3 linhas.

            🛒 Ingredientes
            - Ingrediente 1
            - Ingrediente 2
            - Ingrediente 3

            👨‍🍳 Modo de Preparo
            1. Passo um bem explicado.
            2. Passo dois detalhado.
            3. Continue numerando corretamente.

            ⏱️ Tempo de preparo: XX minutos  
            🔥 Nível de dificuldade: Fácil | Médio | Difícil  
            🍷 Sugestão de acompanhamento: (opcional)

            Finalize sempre com uma frase motivadora como um verdadeiro chef.
            `
          },
          {
            role: 'user',
            content: `Crie uma receita com esses ingredientes: ${ingredientes}`
          }
        ],
        temperature: 1,
        max_tokens: 1024
      })

      setReceita(resposta.data.choices[0].message.content)
    }

    return (
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/*Header*/}
        <View style={styles.header}>
          <Text style={styles.emoji}>🧑‍🍳</Text>  
          <Text style = {styles.title}>Chef de IA</Text>
          <Text style={styles.subTitle}>Digite seus ingredientes...</Text>
          
        </View> 

        {/*Input*/}
        <TextInput style={styles.input}
        placeholder='Ex: Frango, arroz, tomate...'
        multiline
        placeholderTextColor={'#888'}
        value={ingredientes}
        onChangeText={setIngedientes}
        />

        {/*Botão*/}
        <TouchableOpacity onPress={gerarReceita} style={styles.button}>
          <Text style={styles.textoBotao}>Gerar Receita</Text>
        </TouchableOpacity>

        {/*Receita*/}
        {receita ? (
          <View style={styles.receitaWrapper}>
            <View style={styles.receitaHeader}>
              <Text style={styles.receitaHeaderText}>

              </Text>
            </View>
            <ScrollView style={styles.receitaContainer}>
              <Text style={styles.receita}>{receita}</Text>
            </ScrollView>
          </View>

          
        ):(
        <View style= {styles.placeholderContainer}>
        <Text style = {styles.placeholderEmoji}>🥘</Text>
        <Text style={styles.placeholderText}>Sua receita aparecerá aqui</Text>
        </View>)}


        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a2e',
      paddingHorizontal: 20,
    },
    header: {
      alignItems:'center',
      paddingTop:60,
      paddingBottom:20,
    },
    emoji: {
      fontSize: 50,
      marginBottom: 10,
    },
    title: {
      fontSize: 32,
      marginBottom:10,
      color: '#fff',
      fontWeight: 'bold',
    },
    subTitle: {
      fontSize: 14,
      color: '#888',
      marginTop: 5,
    },
    input: {
      backgroundColor:'#2d2d44',
      borderRadius: 15,
      padding: 15,
      fontSize: 18,
      color: '#fff',
      minHeight: 80,
      textAlignVertical:'top',
      marginBottom: 15,
    },
    button:{
      backgroundColor: '#DB6750',
      minHeight: 40,
      borderRadius: 10,
      padding: 12,
      alignItems: 'center',
    },

    textoBotao: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

    receitaWrapper: {
      flex: 1,
      marginTop: 30,
      borderRadius:20,
      overflow:'hidden',
      backgroundColor:'#2d2d44'
    },
    receitaHeader: {
      backgroundColor: "#e17055",
      paddingVertical: 12,
      paddingHorizontal: 15,
    },
    receitaHeaderText: {
      color:"#fff",
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',

    },
    receitaContainer: {
      flex:1,
      padding:20,
    },
    receita: {
      color: "#fff",
      fontSize: 16,
      lineHeight: 26,
    },
    placeholderContainer: {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    placeholderEmoji: {
      fontSize:60,
      marginBottom: 15,
    },
    placeholderText: {
      color: '#666',
      fontSize:16,
    }

  });
