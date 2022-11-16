import React from "react";
import axios from 'axios'

const API_URL = '/api/subscriptions/'

export const addSubscription = async (user) => { 
    const config = {
    headers: {
      Authorization: `--`,
    },
  }
  const response = await axios.post(API_URL, user, config)
  return response.data
}

export const getSubscriptions = async (user) => { 
     const config = {
    headers: {
      Authorization: `--`,
    },
  }

  const response = await axios.get(API_URL, user, config)
  return response.data
    
}

export const deleteSubscription = async(user) => {
    const config = {
    headers: {
      Authorization: `--`,
    },
  }

  const response = await axios.delete(API_URL, user, config)

  return response.data  

}

