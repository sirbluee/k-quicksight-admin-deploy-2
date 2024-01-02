import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, RadioGroup, Radio, Checkbox, Pagination, Select, SelectItem, User } from "@nextui-org/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useGetAllAnalysisQuery } from "@/store/features/analysis/Analysis";
import { useCreateSampleAnalysisMutation } from "@/store/features/sample/sampleApiSlice";
import { toast, ToastContainer } from "react-toastify";
import { generateBashURL } from "@/utils/generateURL";


export default function AddNewAnalysisModal() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [title, setTitle] = useState('')
    const { data: analysis } = useGetAllAnalysisQuery({ page: page, size: size, title: title });
    const [createSampleAnalysis] = useCreateSampleAnalysisMutation();

    const [uuid, setUUID] = useState(null)
    const handleChangeAnalysis = (e) => {
        setUUID(e.target.value)
    }

    const handleSaveSampleAnalysis = async () => {
        try {
            const data = {
                analysis_uuid: uuid,
            };
            const response = await createSampleAnalysis({ data: data });
            if (response?.data?.analysis_uuid[0]) {
                toast.success(response?.data?.analysis_uuid[0])
            } else {
                toast.success("Sample Analysis saved successfully.")
            }

        } catch (error) {
            console.error("An error occurred:", error);
        }
    }



    return (
        <>
            <Button className={'bg-primary-color text-white'} onPress={onOpen}><AiOutlinePlusCircle /> Add new</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Search Sample Analysis</ModalHeader>
                            <ModalBody>
                                <div className={'flex justify-between items-center'}>
                                    <Input startContent={<BiSearch />} placeholder={'Search users ...'} onValueChange={setTitle} className={'w-1/3 my-3'}
                                        classNames={{
                                            inputWrapper: [
                                                'rounded-full'
                                            ]
                                        }}
                                        variant={'bordered'} size={'sm'} color={'primary'} />
                                </div>
                                <RadioGroup
                                    // label="Select your sample analysis.."
                                    color="secondary"
                                    defaultValue="london"
                                >
                                    {
                                        analysis?.results.map((item, index) => (
                                            <Radio onChange={handleChangeAnalysis} className="m-1" key={index} value={item?.uuid}>
                                                <User
                                                    name={item?.title + " - "+item?.model_name+" - "+item?.file?.file}
                                                    description={item?.user?.username}
                                                    avatarProps={{
                                                        src: generateBashURL(item?.thumbnail)
                                                    }}
                                                />
                                            </Radio>
                                        ))
                                    }
                                </RadioGroup>

                                <div className={'my-5 flex gap-5 justify-start items-center'}>
                                    <Pagination
                                        onChange={setPage}
                                        key={'page'} total={analysis?.pages.length} initialPage={1} color={'primary'} />

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={handleSaveSampleAnalysis}>
                                    Save
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
