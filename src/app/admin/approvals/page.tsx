"use client";

import { useEffect, useState } from "react";
import { getApprovalRequests, updateApprovalRequest } from "@/lib/api";
import type { ApprovalRequest } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import React from "react";

export default function AdminApprovalsPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentById, setCommentById] = useState<Record<string, string>>({});

  useEffect(() => {
    getApprovalRequests()
      .then((data) => setRequests(data))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    const adminComments = commentById[id] || "";
    const updated = await updateApprovalRequest(id, { status, adminComments });
    setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, ...updated } : r)));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Approval Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Suggested Adjustments</TableHead>
              <TableHead>Analysis Results</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Admin Comments</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req._id}>
                <TableCell className="max-w-[160px] truncate">{req._id}</TableCell>
                <TableCell>
                  {typeof req.productId === 'object' && req.productId ?
                    // @ts-expect-error backend populates differently
                    (req.productId.productName || req.productId.name || req.productId._id) :
                    (req.productId as string) || '-'}
                </TableCell>
                <TableCell>{req.performanceChange ?? '-'}</TableCell>
                <TableCell>
                  {Array.isArray(req.suggestedAdjustments) && req.suggestedAdjustments.length > 0 ? (
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">View</Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Suggested Adjustments</DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                          <pre className="max-w-none whitespace-pre-wrap break-words text-sm">
{JSON.stringify(req.suggestedAdjustments, null, 2)}
                          </pre>
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell>
                  {req.analysisResult && req.analysisResult.trim().length > 0 ? (
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">View</Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Analysis Result</DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                          <div className="prose max-w-none whitespace-pre-wrap break-words">
                            {req.analysisResult}
                          </div>
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell className="capitalize">{req.status}</TableCell>
                <TableCell className="w-[260px]">
                  <Textarea
                    placeholder="Optional comment"
                    value={commentById[req._id] || ''}
                    onChange={(e) => setCommentById((m) => ({ ...m, [req._id]: e.target.value }))}
                  />
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(req._id, 'approved')}
                    disabled={req.status !== 'pending'}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction(req._id, 'rejected')}
                    disabled={req.status !== 'pending'}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

