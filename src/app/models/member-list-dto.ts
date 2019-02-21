import { List } from "linqts";

export class MemberListDto{
    memberList: List<MembersDto>;
    pageNumber: number;
    pageSize: number;
    totalMembersCount: number;
}

export class MembersDto {
    memberId: number;
    memberNumber: string;
    memberFullName: string;
    memberDate: string;
    statusParameterName: string;
    isDisabled: string;
}