import '../style/App.css';
import '../style/style.css'
import '../style/tabStyle.css'

function App() {
  return (
    <div class = "container">
			<div class = "menu">
				<button id="saveBtn">Save</button>
				<button id="loadBtn">Load</button>
				<button id="saveAsBtn">SaveAs</button>
				<button id="tabBtn">Tab</button>
			</div>
			<p></p><p></p>
			<div class = "tab_li" id = "tab-li">

			</div>
			<div class = "tab_container" id = "tab-container">

			</div>
			<p></p>
			<div class = "save_container">
				<div class = "notselected" id = "save-container">
					LOAD
					<p></p>
				</div>
			</div>
		</div>
  );
}

export default App;
