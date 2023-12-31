import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

type ToggleProps = {
    UpdateFunction: Function;
}

function Toggle(Props: ToggleProps): JSX.Element {
  const game = useSelector((state: RootState) => state.game)

  // Placeholder values
  const isEnabled = true
  function toggleSwitch() {}

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Toggle;