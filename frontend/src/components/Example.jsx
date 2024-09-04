import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

function Example() {
  const [selectedPeople, setSelectedPeople] = useState([]);
  console.log(selectedPeople);
  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <ListboxButton className="bg-blue-200 p-1 border border-border rounded">
        {/* {selectedPeople.map((person) => person.name).join(", ")} */}
        Please select actor
      </ListboxButton>
      <ListboxOptions anchor="bottom" className="bg-dry text-text p-2">
        {people.map((person) => (
          <ListboxOption
            key={person.id}
            value={person.id}
            className="data-[focus]:bg-main"
          >
            {person.name} {selectedPeople.includes(person.id) && "✔️"}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default Example;
