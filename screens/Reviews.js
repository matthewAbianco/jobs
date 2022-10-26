import { View, Text } from "react-native"
import React from "react"

const Reviews = () => {
  return (
    <View>
      <View>{/* Photo of the session */}</View>
      <View>
        <Text>{/* Name of the person reviewing */}</Text>
        <View>{/* Star Ranking */}</View>
        <View>
          <Text>{/* Feedback of the session */}</Text>
        </View>
        <Text>{/* Location of session */}</Text>
        <Text>{/* Date Added */}</Text>
      </View>
    </View>
  )
}

export default Reviews
