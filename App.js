// Import necessary components from React and React Native.
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Picker, SectionList } from 'react-native';

// Define the main App component as a class.
export default class App extends React.Component {

  // The constructor initializes the component and sets its initial state.
  constructor(props) {
    super(props);

    // Setting the initial state of the component.
    this.state = {
      item: '', // This will store the current item that the user types into the TextInput.
      selectedSection: 'Fruits', // By default, we'll set the selected section to 'Fruits'.
      sections: [ // This array holds the data for the SectionList.
        { title: 'Fruits', data: [] },
        { title: 'Vegetables', data: [] }
      ]
    };
  }

  // This function handles adding an item to the appropriate section.
  addItemToSection = () => {
    // First, we ensure that the user has entered a non-empty item.
    if (this.state.item.trim() !== '') {
      // We make a copy of the current sections for modification.
      let copiedSections = this.state.sections.slice();

      // We loop over each section.
      for (let i = 0; i < copiedSections.length; i++) {
        // If we find the section that matches the currently selected one:
        if (copiedSections[i].title === this.state.selectedSection) {
          // We add the new item to that section.
          copiedSections[i].data.push(this.state.item);
          break; // After adding, we can exit the loop.
        }
      }

      // Finally, we update the component's state with our modified sections and reset the item input.
      this.setState({ sections: copiedSections, item: '' });
    }
  }

  // The render function defines the UI of the component.
  render() {
    return (
        <View style={styles.container}>

          {/* This is the input where users can type an item. */}
          <TextInput
              style={styles.input}
              placeholder="Enter an item"
              value={this.state.item}
              onChangeText={(text) => this.setState({ item: text })}
          />

          {/* This dropdown allows users to select a category (either 'Fruits' or 'Vegetables'). */}
          <Picker
              selectedValue={this.state.selectedSection}
              onValueChange={(value) => this.setState({ selectedSection: value })}
              style={styles.picker}>
            <Picker.Item label="Fruits" value="Fruits" />
            <Picker.Item label="Vegetables" value="Vegetables" />
          </Picker>

          {/* This button will add the typed item to the selected category when pressed. */}
          <Button title="Add Item" onPress={this.addItemToSection} />

          {/* This list displays the items, organized by their category. */}
          <SectionList
              sections={this.state.sections}
              renderItem={({ item }) => <Text style={styles.itemText}>{item}</Text>}
              renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index.toString()}
          />
        </View>
    );
  }
}

// Here, we define the styles for our UI components.
// React Native uses a system similar to CSS but with different naming conventions and syntax.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  itemText: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#f7f7f7',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
