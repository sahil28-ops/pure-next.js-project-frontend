
const InputForm = ({ setType, setPlaceholder, inputValue, clickme, setLabel, setId, setClass }) => {
    return (
        <>
            <Form.Group className={setClass} controlId={setId}>
                <Form.Label>{setLabel}</Form.Label>
                <Form.Control type={setType} placeholder={setPlaceholder} value={inputValue} onChange={clickme} />
            </Form.Group>
        </>
    )
}

export default InputForm