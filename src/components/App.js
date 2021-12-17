import { useState, useEffect, useCallback, useRef } from 'react';
import Notepad from './Notepad';
import TabList from './TabList';
import MenuList from './MenuList';
import Login from './Login';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id : 1,
			title : "O",
			text: "",
			selected: true,
		},
	]);

	useEffect(() => {
		localStorage.clear();
		localStorage.setItem("O", "")
	}, []);

	const nextId = useRef(2)

	/**
	 * TAB 버튼 눌러 비어 있는 새로운 탭을 생성 후 그 외의 탭 비활성화 후, 해당 탭 활성화
	 */
	const onNewTab = useCallback(
		() => {
			const note = {
				id : nextId.current,
				title : "O",
				text : "",
				selected : true
			}
			const newNotes = notes.map(note => ({...note, selected: false}))
			setNotes(newNotes.concat(note));
			nextId.current += 1;
			console.log("onNewTab!!!")
		},
		[notes]
	)

	/**
	 * X 버튼을 눌러 생성된 탭을 제거, 인디케이터 활성화 시 제거 불가, 제거 시 가장 낮은 ID 탭을 활성화
	 */
	const onDelete = useCallback(
		id => {
			let checkingNote = notes.find(note => note.id === id)
			let checkingStor = localStorage.getItem(checkingNote.title)
			let checkingText = checkingNote.text
			if(checkingStor !== checkingText) {
				return alert ("아직 데이터가 저장되지 않았습니다.")
			}

			const newNotes = notes.filter(note => note.id !== id)
			let minIdNewNotes = Math.min.apply(Math, newNotes.map(note => note.id))
			setNotes(newNotes.map(note => note.id !== minIdNewNotes ? { ...note, selected: false} : { ...note, selected: true}));
			console.log("onDelete!!!")
		}, 
		[notes]
	)

	/**
	 * Textarea에 작성되는 문자열을 노트에 실시간으로 저장
	 */
	const onChangeText = useCallback(
		texts => {
			setNotes(notes.map(note => note.selected === true ? {...note, text: texts} : note))
			console.log("onChangeText!!!")
		},
		[notes]
	)

	/**
	 * Tab 목록들 중 해당하는 Tab 클릭 시 Tab에 부여된 id 값을 따라 활성화
	 */
	const onClickToTabLi = useCallback(
		id => {
			setNotes(notes.map(note => note.id === id ? { ...note, selected: true} : { ...note, selected: false}));
			console.log("onClickToTablLi!!!")
		},
		[notes]
	)


  return (
	  <Notepad>
		<Login></Login>
		<MenuList notes = {notes} setNotes = {setNotes} nextId = {nextId} onNewTab = {onNewTab} >
		</MenuList>
		<TabList notes = {notes} onDelete = {onDelete} onChangeText = {onChangeText} onClickToTabLi = {onClickToTabLi}>
		</TabList>	
	</Notepad>
  );
}

export default App;

