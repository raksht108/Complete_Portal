import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management.
import { Container, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from '@material-ui/core'; // Import Material-UI components for the UI.
import { Add, Delete, Save, ArrowUpward, ArrowDownward, FileCopy as FileCopyIcon } from '@material-ui/icons'; // Import Material-UI icons for buttons and interactions.
import axios from 'axios'; // Import axios for making HTTP requests.


const TestStepDesign = ({ testSteps, setTestSteps, manualTestCase, saveTestSteps }) => {
    // Define state hooks for keywords, OR Pages, pagination, etc.
    const [keywords, setKeywords] = useState([]); // State for storing keywords fetched from the backend.
    const [orPages, setOrPages] = useState([]); // State for storing OR Pages fetched from the backend.
    const [page, setPage] = useState(0); // State for tracking the current page of pagination.
    const [totalPages, setTotalPages] = useState(1); // State for storing the total number of pages available.
    // State for storing the list of TCIDs
    const [tcids, setTcids] = useState([]);

    // useEffect to fetch OR Pages from the backend when the page changes.
    useEffect(() => {
        if (page < totalPages) { // Ensure the page number is within the total pages limit.
            axios.get(`/api/teststeps/orpages?page=${page}&size=500`) // Make a GET request to fetch OR Pages.
                .then(response => {
                    setOrPages(prevOrPages => [...prevOrPages, ...response.data.content]);  // Append new pages to the existing list.
                    setTotalPages(response.data.totalPages);  // Update the total number of pages.
                })
                .catch(error => {
                    console.error("Error fetching OR Pages:", error); // Log any errors that occur during the fetch.
                });
        }
    }, [page]); // The effect runs whenever `page` changes.

    // useEffect to fetch keywords when the component mounts.
    useEffect(() => {
        axios.get('/api/teststeps/keywords') // Make a GET request to fetch keywords.
            .then((response) => {
                setKeywords(response.data); // Set the fetched keywords in state.
            })
            .catch((error) => {
                console.error("Error fetching keywords: ", error); // Log any errors during the fetch.
            });
            // Fetch TCIDs for the Goto Fail dropdown.
            axios.get(`/api/teststeps/tcids?page=0&size=500`)
            .then(response => setTcids(response.data.content))
            .catch(error => console.error("Error fetching TCIDs:", error));

    }, []); // Empty dependency array ensures this runs once on component mount.

    // useEffect to add a default test step if none exist when the user navigates to Test Step Design.
    useEffect(() => {
        if (testSteps.length === 0) {
            addTestStep(); // Add a default test step if no steps exist.
        }
    }, [testSteps]); // This effect depends on `testSteps`.

    // Function to handle changes to a specific test step field.
    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...testSteps]; // Create a copy of the test steps array.
        updatedSteps[index][field] = value; // Update the specific field for the step at the given index.
        setTestSteps(updatedSteps); // Update the test steps state with the modified array.
    };

    // Function to add a new test step with default values.
    const addTestStep = () => {
        setTestSteps([...testSteps, { orPage: '', orName: '', description: '', keyword: '', data: '', gotoFail: '', skipTime: 0, ajaxSkip: false }]);
    };

    // Function to delete a specific test step by index.
    const deleteTestStep = (index) => {
        const updatedSteps = testSteps.filter((step, i) => i !== index); // Filter out the step at the given index.
        setTestSteps(updatedSteps); // Update the test steps state with the remaining steps.
    };

    // Function to copy a test step and add it to the list.
    const copyTestStep = (index) => {
        const copiedStep = { ...testSteps[index] }; // Create a deep copy of the step at the given index.
        setTestSteps([...testSteps, copiedStep]);   // Append the copied step to the test steps array.
    };

    // Function to clear all test steps.
    const clearTestSteps = () => {
        setTestSteps([]);  // Set test steps to an empty array.
    };

    // Function to move a test step up or down in the list.
    const moveStep = (index, direction) => {
        const updatedSteps = [...testSteps]; // Create a copy of the test steps array.
        const swapIndex = direction === 'up' ? index - 1 : index + 1; // Determine the swap index based on direction.
        [updatedSteps[index], updatedSteps[swapIndex]] = [updatedSteps[swapIndex], updatedSteps[index]]; // Swap the positions of the steps.
        setTestSteps(updatedSteps); // Update the test steps state with the modified order.
    };

    return (
        <>
            <Typography variant="h6">Test Steps Design</Typography> {/* Display the heading for the section */}
            {testSteps.map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}> {/* Render each test step as a row */}
                    <FormControl style={{ minWidth: 150, marginRight: 10, flex: 1 }}> {/* Dropdown for selecting OR Page */}
                        <InputLabel>OR Page</InputLabel>
                        <Select
                            value={step.orPage} // Bind selected value to step's orPage field.
                            onChange={(e) => handleStepChange(index, 'orPage', e.target.value)} // Handle changes to OR Page.
                        >
                            {orPages.map((orPage) => (
                                <MenuItem key={orPage.id} value={orPage.orPageName}> {/* Display available OR Pages */}
                                    {orPage.orPageName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="OR Name"
                        value={step.orName} // Bind value to step's orName field.
                        onChange={(e) => handleStepChange(index, 'orName', e.target.value)} // Handle changes to OR Name.
                        style={{ marginRight: 10, flex: 1 }}
                    />

                    <TextField
                        label="Description"
                        value={step.description} // Bind value to step's description field.
                        onChange={(e) => handleStepChange(index, 'description', e.target.value)} // Handle changes to description.
                        style={{ marginRight: 10, flex: 2 }}
                    />

                    <FormControl style={{ minWidth: 150, marginRight: 10, flex: 1 }}> {/* Dropdown for selecting a keyword */}
                        <InputLabel>Keyword</InputLabel>
                        <Select
                            value={step.keyword} // Bind selected value to step's keyword field.
                            onChange={(e) => handleStepChange(index, 'keyword', e.target.value)} // Handle changes to keyword.
                        >
                            {keywords.map((keyword, idx) => (
                                <MenuItem key={idx} value={keyword}> {/* Display available keywords */}
                                    {keyword}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 150, marginRight: 10, flex: 1 }}>
                        <InputLabel>Goto Fail</InputLabel>
                        <Select
                            value={step.gotoFail}
                            onChange={(e) => handleStepChange(index, 'gotoFail', e.target.value)}
                        >
                            {tcids.map((tcid, idx) => (
                                <MenuItem key={idx} value={tcid}>{tcid}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Button to move step up, disabled if it's the first step */}
                    <IconButton onClick={() => moveStep(index, 'up')} disabled={index === 0}>
                        <ArrowUpward />
                    </IconButton>

                    {/* Button to move step down, disabled if it's the last step */}
                    <IconButton onClick={() => moveStep(index, 'down')} disabled={index === testSteps.length - 1}>
                        <ArrowDownward />
                    </IconButton>

                    {/* Button to copy a test step */}
                    <IconButton onClick={() => copyTestStep(index)}>
                        <FileCopyIcon />
                    </IconButton>

                    {/* Button to delete a test step */}
                    <IconButton onClick={() => deleteTestStep(index)}>
                        <Delete />
                    </IconButton>
                </div>
            ))}

            {/* Button to add a new test step */}
            <Button onClick={addTestStep} variant="contained" color="primary" startIcon={<Add />}>
                Add Step
            </Button>

            {/* Button to save the test steps */}
            <Button onClick={saveTestSteps} variant="contained" color="primary" startIcon={<Save />} style={{ marginLeft: 10 }}>
                Save Steps
            </Button>

            {/* Button to clear all test steps */}
            <Button onClick={clearTestSteps} variant="contained" color="secondary" style={{ marginLeft: 10 }}>
                Clear Steps
            </Button>
        </>
    );
};

const CreateTestCaseForm = () => {

    // Define state for mode and manual test case form fields.
    const [mode, setMode] = useState('manual'); // State to track the form mode (manual or test step design).
    const [manualTestCase, setManualTestCase] = useState({ // Initial state for manual test case fields.
        tcid: '', module: '', description: '', knownDefect: '', defectStatus: '', testSuite: '',
        runMode: '', testCaseType: '', dependency: '', priority: '', remarks: ''
    });
    const [testSteps, setTestSteps] = useState([]); // State to track the test steps.

    // Function to handle changes in the manual test case form fields.
    const handleManualChange = (e) => {
        setManualTestCase({
            ...manualTestCase, // Copy the current state.
            [e.target.name]: e.target.value, // Update the field that changed.
        });
    };

    // Function to handle form submission for manual test case creation.
    const handleManualSubmit = (e) => {
        e.preventDefault(); // Prevent form's default submit behavior.
        console.log('Manual Test Case Data:', manualTestCase); // Log the manual test case data (can replace with actual save logic).
    };

    // Function to save the test steps. Validates required fields before saving.
    const saveTestSteps = () => {
        if (!manualTestCase.tcid || !manualTestCase.module || !manualTestCase.description) {
            alert("Please fill out the mandatory fields: TCID, Module and Description on Manual Test Case form"); // Validation message.
            return;
        }

        console.log(testSteps); // Log the test steps data (can replace with actual save logic).
    };

    return (
        <Container> {/* Main container for the form */}
            <Typography variant="h5" gutterBottom>Create New Test Case</Typography> {/* Heading for the form */}

            {/* Buttons to switch between modes (Manual Test Case or Test Step Design) */}
            <Button
                variant={mode === 'manual' ? 'contained' : 'outlined'} // Active mode is styled as contained.
                color="primary"
                onClick={() => setMode('manual')} // Switch to manual mode.
                style={{ marginRight: '10px' }}
            >
                Manual Test Case
            </Button>
            <Button
                variant={mode === 'TestStepDesign' ? 'contained' : 'outlined'} // Active mode is styled as contained.
                color="primary"
                onClick={() => setMode('TestStepDesign')} // Switch to Test Step Design mode.
            >
                Test Step Design
            </Button>

            {/* Manual Test Case form - rendered only when the mode is 'manual' */}
            {mode === 'manual' && (
                <form onSubmit={handleManualSubmit} style={{ marginTop: '20px' }}>
                    {/* Form field for TCID */}
                    <TextField
                        label="TCID"
                        variant="outlined"
                        fullWidth
                        name="tcid"
                        value={manualTestCase.tcid} // Bind value to manualTestCase's tcid field.
                        onChange={handleManualChange} // Handle changes in TCID field.
                        required
                        style={{ marginBottom: '10px' }}
                    />

                    {/* Dropdown for selecting Module */}
                    <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                        <InputLabel>Module</InputLabel>
                        <Select
                            label="Module"
                            name="module"
                            value={manualTestCase.module} // Bind value to manualTestCase's module field.
                            onChange={handleManualChange} // Handle changes in Module field.
                            required
                        >
                            {/* Menu items for module options */}
                            <MenuItem value="test">test</MenuItem>
                            <MenuItem value="Test Module">Test Module</MenuItem>
                            <MenuItem value="Salary">Salary</MenuItem>
                            <MenuItem value="Competitive Concentration">Competitive Concentration</MenuItem>
                            <MenuItem value="Employers lookup">Employers lookup</MenuItem>
                            <MenuItem value="Skills Taxonomy">Skills Taxonomy</MenuItem>
                            <MenuItem value="Titles Ranking">Titles Ranking</MenuItem>
                            <MenuItem value="Improvement">Improvement</MenuItem>
                            <MenuItem value="Posting Duration">Posting Duration</MenuItem>
                            <MenuItem value="Taxonomy-Occupations">Taxonomy-Occupations</MenuItem>
                            <MenuItem value="Monthly Demand Trend - Titles">Monthly Demand Trend - Titles</MenuItem>
                            <MenuItem value="MonthlyDemandTrend-Locations">MonthlyDemandTrend-Locations</MenuItem>
                            <MenuItem value="EthnicDiversity">EthnicDiversity</MenuItem>
                            <MenuItem value="SkillTaxonomyDeepPagination">SkillTaxonomyDeepPagination</MenuItem>                    {/* Add more items as needed */}
                        </Select>
                    </FormControl>

                    {/* Text field for Description */}
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        name="description"
                        value={manualTestCase.description} // Bind value to manualTestCase's description field.
                        onChange={handleManualChange} // Handle changes in Description field.
                        required
                        style={{ marginBottom: '10px' }}
                    />

                    {/* Form controls for other fields like Known Defect, Defect Status, etc. */}
                    <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                        <InputLabel>Known Defect</InputLabel>
                        <Select
                            label="Known Defect"
                            name="knownDefect"
                            value={manualTestCase.knownDefect} // Bind value to manualTestCase's knownDefect field.
                            onChange={handleManualChange} // Handle changes in Known Defect field.
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                        <InputLabel>Defect Status</InputLabel>
                        <Select
                            label="Defect Status"
                            name="defectStatus"
                            value={manualTestCase.defectStatus} // Bind value to manualTestCase's defectStatus field.
                            onChange={handleManualChange} // Handle changes in Defect Status field.
                        >
                            <MenuItem value="Pass">Pass</MenuItem>
                            <MenuItem value="Fail">Fail</MenuItem>
                        </Select>
                    </FormControl>
<TextField
                            label="Test Suite"
                            variant="outlined"
                            fullWidth
                            name="testSuite"
                            value={manualTestCase.testSuite}
                            onChange={handleManualChange}
                            style={{ marginBottom: '10px' }}
                          />
                          <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                            <InputLabel>Run Mode</InputLabel>
                            <Select
                              label="Run Mode"
                              name="runMode"
                              value={manualTestCase.runMode}
                              onChange={handleManualChange}
                            >
                              <MenuItem value="Y">Y</MenuItem>
                              <MenuItem value="N">N</MenuItem>
                            </Select>
                          </FormControl>
                           <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                                      <InputLabel>Test Case Type</InputLabel>
                                      <Select
                                        label="Test Case Type"
                                        name="testCaseType"
                                        value={manualTestCase.testCaseType}
                                        onChange={handleManualChange}
                                      >
                                        <MenuItem value="Smoke">Smoke</MenuItem>
                                        <MenuItem value="Regression">Regression</MenuItem>
                                      </Select>
                                    </FormControl>

                          <TextField
                            label="Test Case Dependency"
                            variant="outlined"
                            fullWidth
                            name="dependency"
                            value={manualTestCase.dependency}
                            onChange={handleManualChange}
                            style={{ marginBottom: '10px' }}
                          />

                                     <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                                                <InputLabel>Test Case Priority</InputLabel>
                                                <Select
                                                  label="Test Case Priority"
                                                  name="priority"
                                                  value={manualTestCase.priority}
                                                  onChange={handleManualChange}
                                                >
                                                  <MenuItem value="High">High</MenuItem>
                                                  <MenuItem value="Medium">Medium</MenuItem>
                                                  <MenuItem value="Low">Low</MenuItem>
                                                </Select>
                                              </FormControl>

                          <TextField
                            label="Remarks"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            name="remarks"
                            value={manualTestCase.remarks}
                            onChange={handleManualChange}
                            style={{ marginBottom: '10px' }}
                          />

                    {/* Navigation for Test Step Design form */}
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}onClick={() => setMode('TestStepDesign')}>
                        Test Step Design
                    </Button>
                </form>
            )}

            {/* Render TestStepDesign component if the mode is 'TestStepDesign' */}
            {mode === 'TestStepDesign' && (
                <TestStepDesign
                    testSteps={testSteps} // Pass test steps to the TestStepDesign component.
                    setTestSteps={setTestSteps} // Function to update test steps in the TestStepDesign component.
                    manualTestCase={manualTestCase} // Pass manualTestCase to validate required fields.
                    saveTestSteps={saveTestSteps}   // Pass saveTestSteps function to handle the save logic.
                />
            )}
        </Container>
    );
};

export default CreateTestCaseForm; // Export the CreateTestCaseForm component for use in other parts of the application.
